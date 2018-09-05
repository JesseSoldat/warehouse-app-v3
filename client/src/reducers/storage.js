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
  RACK_UPDATE_ONE,
  RACK_CREATE_ONE
} from "../actions/storage";

const initialState = {
  storages: [],
  storage: null,
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
        storage: null,
        storageIdsEntity: null,
        storageIdsRequsted: false,
        storageIdsLoaded: false,
        rack: null,
        rackRequsted: false,
        rackLoaded: false,
        search: [],
        storageType: null
      };

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
        storage: null,
        storageType: null
      };

    case STORAGE_UPDATE_ONE:
      // console.log("STORAGE_UPDATE_ONE", update);
      const updateStorages = [...state.storages];
      // API update = storage
      const updateIndex = updateStorages.findIndex(
        obj => obj._id === update._id
      );

      updateStorages.splice(updateIndex, 1, update);

      return {
        ...state,
        storages: updateStorages,
        storageIdsEntity: null
      };

    case STORAGE_CREATE_ONE:
      // console.log("STORAGE_CREATE_ONE", update);
      storagesCopy = [...state.storages];

      if (storagesCopy.length > 0) {
        // API update = storage
        storagesCopy.push(update);
      }
      return {
        ...state,
        storages: storagesCopy,
        rack: null
      };

    case STORAGE_DELETE_ONE:
      // console.log("STORAGE_DELETE_ONE", update);
      storagesCopy = [...state.storages];
      rackCopy = state.rack === null ? null : { ...state.rack };

      switch (storageType) {
        case "storage":
          // API update = { storageId }
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

          break;
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
          if (rackCopy) {
            // console.log('rackCopy', rackCopy);
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
        storage: null,
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
      // console.log("prev", state.rack);
      // console.log("update", update);
      // console.log("type:", storageType);
      let rackUpdate = { ...state.rack };

      switch (storageType) {
        case "rack":
          const { rackLabel } = update;
          rackUpdate["rackLabel"] = rackLabel;
          break;

        case "shelf":
          const { shelfId, shelfLabel } = update;

          rackUpdate.shelves.forEach(shelf => {
            if (shelf => shelf._id === shelfId) {
              shelf.shelfLabel = shelfLabel;
            }
          });
          break;

        case "shelfSpot":
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
        storageType,
        rack: rackUpdate,
        storageIdsEntity: null
      };

    case RACK_CREATE_ONE:
      // console.log("RACK_CREATE_ONE", update);
      storagesCopy = [...state.storages];
      rackCopy = state.rack === null ? null : { ...state.rack };

      switch (storageType) {
        case "rack":
          // API update = { storage, rack }
          if (storagesCopy.length !== 0) {
            //[] of storages in store
            storageId = update.storage._id;
            storageIndex = storagesCopy.findIndex(obj => obj._id === storageId);
            // console.log("storageIndex", storageIndex);

            if (storageIndex >= 0) {
              storagesCopy[storageIndex].racks.push(update.rack);
              // console.log("updated storage", storagesCopy[storageIndex]);
            }
          }

          rackCopy = update.rack;
          break;

        case "shelf":
          // API update = { rack, shelfId }
          rackCopy = update.rack;
          break;

        case "shelfSpot":
          // API update = { rack, shelfSpotId }
          rackCopy = update.rack;
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

    default:
      return { ...state };
  }
};
