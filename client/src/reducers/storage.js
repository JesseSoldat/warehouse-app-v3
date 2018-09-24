import {
  RESET_STORAGE,
  // storage
  STORAGES_SEARCH_REQUESTED,
  STORAGES_SEARCH_LOADED,
  STORAGES_REQUESTED,
  STORAGES_LOADED,
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
import { BOX_UPDATE_ONE } from "../actions/box";
import {
  LINK_BOX_TO_SHELFSPOT,
  LINK_PRODUCT_TO_SHELFSPOT
} from "../actions/link";
import {
  UNLINK_BOX_FROM_SHELFSPOT,
  UNLINK_PRODUCT_FROM_SHELFSPOT
} from "../actions/unlink";
import {
  BOX_CREATE_ONE_LINK,
  BOX_DELETE_ONE_WITH_LOCATION
} from "../actions/box";

const initialState = {
  search: [],
  storagesSearchRequsted: false,
  storagesSearchLoaded: false,
  storages: [],
  storagesRequsted: false,
  storagesLoaded: false,
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
  let storageIdsCopy, storagesCopy, rackCopy;
  // IDS -----------------------------------------------
  let storageId, rackId, shelfId, shelfSpotId;

  const getIndexFromArray = (array, id) =>
    array.findIndex(obj => obj._id === id);

  // FIND RACK in STORAGE --------------------------------
  const findRackInStoragesAndUpdate = () => {
    // Needs rackCopy
    console.log("----------findRackInStoragesAndUpdate-----------");
    storagesCopy = [...state.storages];

    if (storagesCopy.length === 0) return console.log("STORE Storages empty");
    // FIND Rack in Storages in the STORE
    storageId = rackCopy.storage._id;
    console.log("storageId", storageId);

    storageIndex = getIndexFromArray(storagesCopy, storageId);
    console.log("storageIndex", storageIndex);

    if (storageIndex >= 0) {
      rackId = rackCopy._id;
      console.log("rackId", rackId);

      rackIndex = getIndexFromArray(storagesCopy[storageIndex].racks, rackId);
      console.log("rackIndex", rackIndex);

      // Update old Rack || Add new Rack to Storages
      rackIndex >= 0
        ? (storagesCopy[storageIndex].racks[rackIndex] = rackCopy)
        : storagesCopy[storageIndex].racks.push(rackCopy);
    }
  };

  // FIND SHELFSPOT in RACK --------------------------------
  const getIdsFromShelfSpot = shelfSpot => {
    shelfSpotId = shelfSpot._id;
    shelfId = shelfSpot.shelf._id;
    rackId = shelfSpot.shelf.rack._id;
    storageId = shelfSpot.shelf.rack.storage._id;

    console.log("--- getIdsFromShelfSpot ---");
    console.log("shelfSpotId", shelfSpotId);
    console.log("shelfId", shelfId);
    console.log("rackId", rackId);
    console.log("storageId", storageId);
  };

  const findShelfSpotInRackAndUpdate = shelfSpot => {
    console.log("----------findItemInRackAndUpdate-----------");
    getIdsFromShelfSpot(shelfSpot);

    rackCopy = state.rack ? { ...state.rack } : null;

    if (!rackCopy || rackCopy._id !== rackId) {
      console.log("STORE Rack is null || rackId does not match");
      storagesCopy = [];
      rackCopy = null;
      return;
    }

    // FIND Shelf Index
    shelfIndex = getIndexFromArray(rackCopy.shelves, shelfId);
    console.log("shelfIndex", shelfIndex);

    // FIND ShelfSpot Index
    if (shelfIndex >= 0) {
      shelfSpotIndex = getIndexFromArray(
        rackCopy.shelves[shelfIndex].shelfSpots,
        shelfSpotId
      );
      console.log("shelfSpotIndex", shelfSpotIndex);
    }

    // UPDATE ShelfSpot in Rack
    if (shelfSpotIndex >= 0) {
      rackCopy.shelves[shelfIndex].shelfSpots.splice(
        shelfSpotIndex,
        1,
        shelfSpot
      );

      // ------------- replace rack in storages ----------------------
      findRackInStoragesAndUpdate();
    }
  };

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
    case STORAGES_SEARCH_REQUESTED:
      return {
        ...state,
        storagesSearchRequsted: true,
        storagesSearchLoaded: false
      };

    case STORAGES_SEARCH_LOADED:
      return {
        ...state,
        search,
        storageType,
        storagesSearchRequsted: false,
        storagesSearchLoaded: true
      };

    case STORAGES_REQUESTED:
      return {
        ...state,
        storagesRequsted: true,
        storagesLoaded: false
      };

    case STORAGES_LOADED:
      return {
        ...state,
        storages: [...storages],
        storageType: null,
        storagesRequsted: false,
        storagesLoaded: true
      };
    // -------------------- STORAGE IDS -------------------------------
    case STORAGE_IDS_REQUESTED:
      return {
        ...state,
        storageIdsRequsted: true,
        storageIdsLoaded: false
      };

    case STORAGE_IDS_LOADED:
      storageIdsCopy = { ...storageIdsEntity };
      return {
        ...state,
        storageIdsEntity: storageIdsCopy,
        storageIdsRequsted: false,
        storageIdsLoaded: true
      };
    // --------------------------- STORAGE UPDATE
    case STORAGE_UPDATE_ONE:
      // API update = { storage }
      storagesCopy = [...state.storages];
      storageIndex = getIndexFromArray(storagesCopy, update.storage._id);

      storageIndex > 0
        ? storagesCopy.splice(storageIndex, 1, update.storage)
        : (storagesCopy = []);

      return {
        ...state,
        storages: storagesCopy,
        storageIdsEntity: null
      };

    case STORAGE_CREATE_ONE:
      // API update = { storage }
      storagesCopy = [...state.storages];

      if (storagesCopy.length > 0) storagesCopy.push(update.storage);

      return {
        ...state,
        storages: storagesCopy,
        rack: null
      };

    case STORAGE_DELETE_ONE:
      // API update = { storageId }
      storagesCopy = [...state.storages];

      if (storagesCopy.length !== 0) {
        storageIndex = getIndexFromArray(storagesCopy, update.storageId);

        storageIndex >= 0
          ? storagesCopy.splice(storageIndex, 1)
          : (storagesCopy = []);
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
      return {
        ...state,
        rack,
        storageType,
        rackRequsted: false,
        rackLoaded: true
      };

    case RACK_UPDATE_ONE:
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
      // API update = { rack }
      rackCopy = update.rack;

      findRackInStoragesAndUpdate();

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
            }
          }
          break;

        case "shelf":
          // API update = { shelfId }
          storagesCopy = [...state.storages];

          // -------------- FIND ShelfSpot index in Rack -------------------
          if (rackCopy) {
            shelfIndex = getIndexFromArray(rackCopy.shelves, update.shelfId);
            // DELETE Shelfspot
            if (shelfIndex >= 0) {
              rackCopy.shelves.splice(shelfIndex, 1);

              // ---------- FIND Rack index in Storages & UPDATE ---------------
              findRackInStoragesAndUpdate();
            }
          }
          break;

        case "shelfSpot":
          // API update = { shelfId, shelfSpotId }
          // -------------- FIND ShelfSpot index in Rack -------------------
          if (rackCopy) {
            shelfIndex = getIndexFromArray(rackCopy.shelves, update.shelfId);
            if (shelfIndex >= 0) {
              shelfSpotIndex = getIndexFromArray(
                rackCopy.shelves[shelfIndex].shelfSpots,
                update.shelfSpotId
              );
            }

            // DELETE Shelfspot
            if (shelfSpotIndex >= 0) {
              rackCopy.shelves[shelfIndex].shelfSpots.splice(shelfSpotIndex, 1);

              // ---------- FIND Rack index in Storages & UPDATE ---------------
              findRackInStoragesAndUpdate();
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

    // ---------- UPDATE STORE Storages and Rack with ShelfSpot ---------
    // API returns update = { shelfSpot }
    // ------------------------ UNLINK & LINK ----------------------------
    case UNLINK_PRODUCT_FROM_SHELFSPOT:
    case LINK_PRODUCT_TO_SHELFSPOT:
      findShelfSpotInRackAndUpdate(update.shelfSpot);

      return {
        ...state,
        storages: storagesCopy,
        storageIdsEntity: null,
        rack: rackCopy
      };

    // ---------------- Box -------------------
    case BOX_DELETE_ONE_WITH_LOCATION:
    case BOX_CREATE_ONE_LINK:
    case LINK_BOX_TO_SHELFSPOT:
    case UNLINK_BOX_FROM_SHELFSPOT:
    case BOX_UPDATE_ONE:
      return {
        ...state,
        storages: [],
        rack: null
      };

    default:
      return { ...state };
  }
};
