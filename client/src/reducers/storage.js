import {
  STORAGE_SEARCH,
  STORAGE_FETCH_ALL,
  STORAGE_FETCH_ONE,
  STORAGE_DELETE_ONE
} from "../actions/storage";

const initialState = {
  storages: [],
  storage: null,
  search: [],
  storageType: null
};

export default (state = initialState, action) => {
  const { type, search, storages, storage, storageType } = action;
  switch (type) {
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
        storage: null,
        storageType: null
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
