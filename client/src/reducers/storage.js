import {
  STORAGE_SEARCH,
  STORAGE_FETCH_ALL,
  STORAGE_FETCH_ONE,
  RACK_REQUESTED,
  RACK_LOADED,
  STORAGE_DELETE_ONE
} from "../actions/storage";

const initialState = {
  storages: [],
  storage: null, // will deprecate
  rack: null,
  rackRequsted: false,
  rackLoaded: false,
  search: [],
  storageType: null
};

export default (state = initialState, action) => {
  const { type, search, storages, storage, rack, storageType } = action;
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

    case STORAGE_FETCH_ONE:
      // console.log("STORAGE_FETCH_ONE", action);
      return { ...state, storage, storageType };

    case STORAGE_DELETE_ONE:
      return { ...state, storage: null, storages: [] };

    default:
      return { ...state };
  }
};
