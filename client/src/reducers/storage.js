import {
  // storage
  STORAGE_SEARCH,
  STORAGE_FETCH_ALL,
  STORAGE_UPDATE_ONE,
  STORAGE_DELETE_ONE,
  STORAGE_IDS_REQUESTED,
  STORAGE_IDS_LOADED,
  // rack
  RACK_REQUESTED,
  RACK_LOADED,
  RACK_UPDATE_ONE,
  // box  DEPRECATE?
  BOX_REQUESTED,
  BOX_LOADED
} from "../actions/storage";

const initialState = {
  storages: [],
  storage: null, // will deprecate
  storageIdsEntity: null,
  storageIdsRequsted: false,
  storageIdsLoaded: false,
  rack: null,
  rackRequsted: false,
  rackLoaded: false,
  box: null,
  boxRequsted: false,
  boxLoaded: false,
  search: [],
  storageType: null
};

export default (state = initialState, action) => {
  const {
    type,
    search,
    storages,
    storage,
    storageIdsEntity,
    rack,
    box,
    storageType,
    update
  } = action;
  switch (type) {
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
      const updateStorages = [...state.storages];
      const updateIndex = updateStorages.findIndex(
        obj => obj._id === storage._id
      );

      updateStorages.splice(updateIndex, 1, storage);

      return {
        ...state,
        storages: updateStorages
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
      const rackUpdate = { ...state.rack };

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
        rack: rackUpdate
      };

    case BOX_REQUESTED:
      return {
        ...state,
        boxRequsted: true,
        boxLoaded: false
      };

    case BOX_LOADED:
      return {
        ...state,
        box,
        storageType,
        boxRequsted: false,
        boxLoaded: true
      };

    case STORAGE_DELETE_ONE:
      return { ...state, storage: null, storages: [] };

    default:
      return { ...state };
  }
};
