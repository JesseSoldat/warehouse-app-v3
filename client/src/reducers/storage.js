import {
  RESET_STORAGE,
  // storage
  STORAGE_SEARCH,
  STORAGE_FETCH_ALL,
  STORAGE_UPDATE_ONE,
  STORAGE_CREATE_ONE,
  STORAGE_DELETE_ONE,
  STORAGE_IDS_REQUESTED,
  STORAGE_IDS_LOADED,
  // rack
  RACK_REQUESTED,
  RACK_LOADED,
  RACK_CREATE_ONE,
  RACK_UPDATE_ONE,
  RACK_DELETE_ONE
} from "../actions/storage";
import {
  LINK_BOX_TO_SHELFSPOT,
  LINK_PRODUCT_TO_SHELFSPOT
} from "../actions/link";
import { UNLINK_PRODUCT_FROM_SHELFSPOT } from "../actions/unlink";

const getIndexFromArray = (array, id) => array.findIndex(obj => obj._id === id);

const initialState = {
  search: [],
  storages: [],
  storageIdsEntity: null,
  storageIdsRequsted: false,
  storageIdsLoaded: false,
  rack: null,
  rackRequsted: false,
  rackLoaded: false,
  storageType: null
};

export default (state = initialState, action) => {
  const {
    type,
    search,
    storages,
    storageIdsEntity,
    rack,
    storageType,
    update
  } = action;

  // INDEXS -------------------------------------------
  let storageIndex, rackIndex, shelfIndex, shelfSpotIndex;
  // COPIES OF STATE --------------------------------
  let storagesCopy, rackCopy;
  // IDS -----------------------------------------------
  let storageId, rackId, shelfId, shelfSpotId;

  switch (type) {
    case RESET_STORAGE:
      return {
        ...state,
        storages: [],
        storageIdsEntity: null,
        storageIdsRequsted: false,
        storageIdsLoaded: false,
        rack: null,
        rackRequsted: false,
        rackLoaded: false,
        search: [],
        storageType: null
      };

    // ----------------------------- STORAGES ---------------------------------
    case STORAGE_SEARCH:
      return {
        ...state,
        search,
        storageType
      };

    case STORAGE_FETCH_ALL:
      // console.log("STORAGE_FETCH_ALL", storages);
      return {
        ...state,
        storages: [...storages],
        storageType: null
      };

    case STORAGE_IDS_REQUESTED:
      return {
        ...state,
        storageIdsRequsted: true,
        storageIdsLoaded: false
      };

    case STORAGE_IDS_LOADED:
      const storageIdsCopy = { ...storageIdsEntity };
      return {
        ...state,
        storageIdsEntity: storageIdsCopy,
        storageIdsRequsted: false,
        storageIdsLoaded: true
      };

    case STORAGE_UPDATE_ONE:
      // console.log("STORAGE_UPDATE_ONE", update);
      storagesCopy = [...state.storages];
      // API update = { storage }
      storageIndex = getIndexFromArray(storagesCopy, update.storage._id);

      if (storageIndex > 0) {
        storagesCopy.splice(storageIndex, 1, update.storage);
      } else {
        storagesCopy = [];
      }

      return {
        ...state,
        storages: storagesCopy,
        storageIdsEntity: null
      };

    case STORAGE_CREATE_ONE:
      storagesCopy = [...state.storages];

      if (storagesCopy.length > 0) {
        // API update = { storage }
        storagesCopy.push(update.storage);
      }
      return {
        ...state,
        storages: storagesCopy,
        rack: null
      };

    case STORAGE_DELETE_ONE:
      // API update = { storageId }
      storagesCopy = [...state.storages];
      // Update Storages in the Store
      if (storagesCopy.length !== 0) {
        storageIndex = getIndexFromArray(storagesCopy, update.storageId);

        if (storageIndex >= 0) {
          storagesCopy.splice(storageIndex, 1);
          // console.log("updated storageCopy", storagesCopy);
        } else {
          storagesCopy = [];
        }
      }
      return {
        ...state,
        storages: storagesCopy,
        storageIdsEntity: null,
        rack: null
      };

    // --------------------------- RACKS --------------------------------------
    case RACK_REQUESTED:
      return {
        ...state,
        rackRequsted: true,
        rackLoaded: false
      };

    case RACK_LOADED:
      // console.log("RACK_LOADED", rack);
      return {
        ...state,
        rack,
        storageType,
        rackRequsted: false,
        rackLoaded: true
      };

    case RACK_UPDATE_ONE:
      // console.log("RACK_UPDATE_ONE", storageType, update);
      rackCopy = { ...state.rack };

      switch (storageType) {
        case "rack":
          // Api update = { rackLabel }
          const { rackLabel } = update;
          rackCopy["rackLabel"] = rackLabel;
          break;

        case "shelf":
          // Api update = { shelfId, shelfLabel }
          const { shelfId, shelfLabel } = update;

          rackCopy.shelves.forEach(shelf => {
            if (shelf._id === shelfId) shelf.shelfLabel = shelfLabel;
          });
          break;

        case "shelfSpot":
          // Api update = { shelfSpotId, shelfSpotLabel }
          const { shelfSpotId, shelfSpotLabel } = update;
          rackCopy.shelves.forEach(shelf => {
            shelf.shelfSpots.forEach(spot => {
              if (spot._id === shelfSpotId)
                spot.shelfSpotLabel = shelfSpotLabel;
            });
          });
          break;

        default:
          break;
      }

      return {
        ...state,
        storages: [],
        storageType,
        rack: rackCopy,
        storageIdsEntity: null
      };

    case RACK_CREATE_ONE:
      // console.log('RACK_CREATE_ONE', update);
      storagesCopy = [...state.storages];
      rackCopy = update.rack;

      const updateStoragesWithRack = (storageId, rack) => {
        // check for persisted data in the STORE
        if (storagesCopy.length !== 0) {
          // find the correct storage to update
          storageIndex = getIndexFromArray(storagesCopy, storageId);
          // console.log("storageIndex", storageIndex);
          if (storageIndex >= 0) {
            storagesCopy[storageIndex].racks.push(rack);
            // console.log("updated storage", storagesCopy[storageIndex]);
          }
        }
      };

      switch (storageType) {
        case "rack":
          // API update = { storage, rack }
          storageId = update.storage._id;
          updateStoragesWithRack(storageId, rackCopy);
          break;

        case "shelf":
          // API update = { rack, shelfId }
          storageId = update.rack.storage._id;
          updateStoragesWithRack(storageId, rackCopy);
          break;

        case "shelfSpot":
          // API update = { rack, shelfSpotId }
          storageId = update.rack.storage._id;
          updateStoragesWithRack(storageId, rackCopy);
          break;

        default:
          break;
      }
      return {
        ...state,
        storageType,
        storages: storagesCopy,
        rack: rackCopy,
        storageIdsEntity: null
      };

    case RACK_DELETE_ONE:
      // console.log("RACK_DELETE_ONE", storageType, update);
      storagesCopy = [...state.storages];
      rackCopy = state.rack === null ? null : { ...state.rack };

      switch (storageType) {
        case "rack":
          // API update = { storageId, rackId }
          rackId = update.rackId;
          storageId = update.storageId;
          rackCopy = null;

          // Update Storages in the Store
          if (storagesCopy.length !== 0) {
            storageIndex = getIndexFromArray(storagesCopy, storageId);

            if (storageIndex >= 0) {
              storagesCopy[storageIndex].racks = storagesCopy[
                storageIndex
              ].racks.filter(rack => rack._id !== rackId);
              // console.log("updated storageCopy", storagesCopy[storageIndex]);
            }
          }
          break;

        case "shelf":
          // API update = { shelfId }
          // No storageId user will have to refetch
          storagesCopy = [];

          if (rackCopy) {
            shelfIndex = getIndexFromArray(rackCopy.shelves, update.shelfId);

            if (shelfIndex >= 0) {
              rackCopy.shelves.splice(shelfIndex, 1);
            }
          }
          break;

        case "shelfSpot":
          // API update = { shelfId, shelfSpotId }
          // No storageId  user will have to refetch
          storagesCopy = [];

          if (rackCopy) {
            // find the shelf
            shelfIndex = getIndexFromArray(rackCopy.shelves, update.shelfId);

            if (shelfIndex >= 0) {
              // find the shelf spot
              shelfSpotIndex = getIndexFromArray(
                rackCopy.shelves[shelfIndex].shelfSpots,
                update.shelfSpotId
              );
            }

            if (shelfSpotIndex >= 0) {
              rackCopy.shelves[shelfIndex].shelfSpots.splice(shelfSpotIndex, 1);
            }
          }
          break;

        default:
          break;
      }

      return {
        ...state,
        storages: storagesCopy,
        storageIdsEntity: null,
        rack: rackCopy
      };

    // ----------------------------- UN-LINKING ----------------------------
    case UNLINK_PRODUCT_FROM_SHELFSPOT:
      // API update = { shelfSpot }
      console.log("UNLINK_PRODUCT_FROM_SHELFSPOT", update);
    // ----------------------------- LINKING -------------------------------
    case LINK_BOX_TO_SHELFSPOT:
    // console.log("LINK_BOX_TO_SHELFSPOT", update);
    // API update = { shelfSpot }
    case LINK_PRODUCT_TO_SHELFSPOT:
      // console.log("LINK_PRODUCT_TO_SHELFSPOT", update);
      // API update = { shelfSpot }
      // ----------- get copies of the state ---------------------
      storagesCopy = [...state.storages];
      state.rack ? (rackCopy = { ...state.rack }) : null;

      const { shelfSpot } = update;
      const { shelf } = shelfSpot;
      // ------------- replace shelfSpot in rack -------------
      rackId = shelf.rack._id;

      if (rackCopy && rackCopy._id === rackId) {
        // console.log("rackCopy", rackCopy);
        // get the index of the shelf
        shelfId = shelf._id;
        shelfIndex = getIndexFromArray(rackCopy.shelves, shelfId);

        // get the index of the shelfspot
        if (shelfIndex >= 0) {
          shelfSpotId = shelfSpot._id;
          shelfSpotIndex = getIndexFromArray(
            rackCopy.shelves[shelfIndex].shelfSpots,
            shelfSpotId
          );
        }

        if (shelfSpotIndex >= 0) {
          rackCopy.shelves[shelfIndex].shelfSpots.splice(
            shelfSpotIndex,
            1,
            shelfSpot
          );

          // ------------- replace rack in storages ----------------------
          if (storagesCopy.length > 0) {
            storageId = rackCopy.storage._id;
            storageIndex = getIndexFromArray(storagesCopy, storageId);

            if (storageIndex >= 0) {
              rackIndex = getIndexFromArray(
                storagesCopy[storageIndex].racks,
                rackId
              );

              if (rackIndex >= 0) {
                // update storages array with updated rack
                storagesCopy[storageIndex].racks[rackIndex] = rackCopy;
              }
            }
          } else {
            console.log("no Storages array in store");
            storagesCopy = [];
          }
        }
      } else {
        console.log("No Rack stored or rackId does not match");
        storagesCopy = [];
        rackCopy = null;
      }

      return {
        ...state,
        storages: storagesCopy,
        storageIdsEntity: null,
        rack: rackCopy
      };

    default:
      return { ...state };
  }
};
