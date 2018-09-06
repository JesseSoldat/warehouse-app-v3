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

const initialState = {
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

  let storageIndex, shelfIndex, shelfSpotIndex;
  let storagesCopy, rackCopy;
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
      return {
        ...state,
        storages: [...storages],
        storageType: null
      };

    case STORAGE_UPDATE_ONE:
      // console.log("STORAGE_UPDATE_ONE", update);
      storagesCopy = [...state.storages];
      // API update = { storage }
      storageIndex = storagesCopy.findIndex(
        obj => obj._id === update.storage._id
      );

      storagesCopy.splice(storageIndex, 1, update.storage);

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
      storageId = update.storageId;
      rackCopy = null;
      // Update Storages in the Store
      if (storagesCopy.length !== 0) {
        storageIndex = storagesCopy.findIndex(obj => obj._id === storageId);
        // console.log("storageIndex", storageIndex);
        if (storageIndex >= 0) {
          storagesCopy.splice(storageIndex, 1);
          // console.log("updated storageCopy", storagesCopy);
        }
      }
      return {
        ...state,
        storages: storagesCopy,
        storageIdsEntity: null,
        rack: rackCopy
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
      // console.log("RACK_UPDATE_ONE", storageType, update);
      let rackUpdate = { ...state.rack };

      switch (storageType) {
        case "rack":
          // Api update = { rackLabel }
          const { rackLabel } = update;
          rackUpdate["rackLabel"] = rackLabel;
          break;

        case "shelf":
          // Api update = { shelfId, shelfLabel }
          const { shelfId, shelfLabel } = update;

          rackUpdate.shelves.forEach(shelf => {
            if (shelf => shelf._id === shelfId) {
              shelf.shelfLabel = shelfLabel;
            }
          });
          break;

        case "shelfSpot":
          // Api update = { shelfSpotId, shelfSpotLabel }
          const { shelfSpotId, shelfSpotLabel } = update;
          rackUpdate.shelves.forEach(shelf => {
            shelf.shelfSpots.forEach(spot => {
              if (spot => spot._id === shelfSpotId) {
                spot.shelfSpotLabel = shelfSpotLabel;
              }
            });
          });
          break;

        default:
          break;
      }
      // console.log("rackUpdate");
      // console.log(rackUpdate);
      return {
        ...state,
        storages: [],
        storageType,
        rack: rackUpdate,
        storageIdsEntity: null
      };

    case RACK_CREATE_ONE:
      storagesCopy = [...state.storages];

      const updateStoragesWithRack = (storageId, rack) => {
        // check for persisted data in the STORE
        if (storagesCopy.length !== 0) {
          // find the correct storage to update
          storageIndex = storagesCopy.findIndex(obj => obj._id === storageId);
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
          rackCopy = update.rack;
          updateStoragesWithRack(storageId, rackCopy);
          break;

        case "shelf":
          // API update = { rack, shelfId }
          storageId = update.rack.storage._id;
          rackCopy = update.rack;
          updateStoragesWithRack(storageId, rackCopy);
          break;

        case "shelfSpot":
          // API update = { rack, shelfSpotId }
          storageId = update.rack.storage._id;
          rackCopy = update.rack;
          updateStoragesWithRack(storageId, rackCopy);
          break;

        default:
          rackCopy = null;
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
            storageIndex = storagesCopy.findIndex(obj => obj._id === storageId);
            // console.log("storageIndex", storageIndex);
            if (storageIndex >= 0) {
              let tempRacks = storagesCopy[storageIndex].racks.filter(
                rack => rack._id !== rackId
              );
              storagesCopy[storageIndex].racks = tempRacks;
              // console.log("updated storageCopy", storagesCopy[storageIndex]);
            }
          }
          break;

        case "shelf":
          // API update = { shelfId }
          shelfId = update.shelfId;
          // No storageId clear storages array and user will have to refetch
          storagesCopy = [];
          if (rackCopy) {
            // console.log(rackCopy);
            // find the shelf and remove it
            shelfIndex = rackCopy.shelves.findIndex(
              shelf => shelf._id === shelfId
            );
            // console.log("shelfIndex", shelfIndex);

            if (shelfIndex >= 0) {
              rackCopy.shelves.splice(shelfIndex, 1);
            }
            // console.log("updated rackCopy", rackCopy);
          }
          break;

        case "shelfSpot":
          // API update = { shelfId, shelfSpotId }
          shelfId = update.shelfId;
          shelfSpotId = update.shelfSpotId;
          // No storageId clear storages array and user will have to refetch
          storagesCopy = [];
          if (rackCopy) {
            // find the shelf
            shelfIndex = rackCopy.shelves.findIndex(
              shelf => shelf._id === shelfId
            );
            // console.log("shelfIndex", shelfIndex);

            if (shelfIndex >= 0) {
              // find the shelf spot
              shelfSpotIndex = rackCopy.shelves[
                shelfIndex
              ].shelfSpots.findIndex(
                shelfSpot => shelfSpot._id === shelfSpotId
              );
            }
            // console.log("shelfSpotIndex", shelfSpotIndex);

            if (shelfSpotIndex >= 0) {
              rackCopy.shelves[shelfIndex].shelfSpots.splice(shelfSpotIndex, 1);
              // console.log("rackCopy updated", rackCopy.shelves[shelfIndex]);
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

    default:
      return { ...state };
  }
};
