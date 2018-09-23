import axios from "axios";

// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
import storageApiUrl from "./helpers/storageApiUrl";
// actions
import { loading, showOverlay } from "./ui";
import { resetBox } from "./box";
// types
export const RESET_STORAGE = "RESET_STORAGE";

export const STORAGE_IDS_REQUESTED = "STORAGE_IDS_REQUESTED";
export const STORAGE_IDS_LOADED = "STORAGE_IDS_LOADED";

export const STORAGES_SEARCH_REQUESTED = "STORAGES_SEARCH_REQUESTED";
export const STORAGES_SEARCH_LOADED = "STORAGES_SEARCH_LOADED";

export const STORAGES_REQUESTED = "STORAGES_REQUESTED";
export const STORAGES_LOADED = "STORAGES_LOADED";

export const STORAGE_CREATE_ONE = "STORAGE_CREATE_ONE";
export const STORAGE_UPDATE_ONE = "STORAGE_UPDATE_ONE";
export const STORAGE_DELETE_ONE = "STORAGE_DELETE_ONE";

export const RACK_REQUESTED = "RACK_REQUESTED";
export const RACK_LOADED = "RACK_LOADED";
export const RACK_UPDATE_ONE = "RACK_UPDATE_ONE";
export const RACK_CREATE_ONE = "RACK_CREATE_ONE";
export const RACK_DELETE_ONE = "RACK_DELETE_ONE";

// Redirect URL after EDIT
const mapTypeToHistoryUrl = (type, ids) => {
  const { storageId, rackId, shelfId, shelfSpotId } = ids;

  const historyUrlObj = {
    storage: `/storage/${storageId}?type=${type}`,
    rack: `/rack/${storageId}/${rackId}?type=${type}`,
    shelf: `/shelf/${storageId}/${rackId}/${shelfId}?type=${type}`,
    shelfSpot: `/shelfSpot/${storageId}/${rackId}/${shelfId}/${shelfSpotId}?type=${type}`
  };
  return historyUrlObj[type];
};

// Redirect URL after DELETE
const mapTypeToParentHistoryUrl = (type, ids) => {
  const { storageId, rackId, shelfId } = ids;

  const historyUrlObj = {
    storage: "/storages",
    rack: `/storage/${storageId}?type=storage`,
    shelf: `/rack/${storageId}/${rackId}?type=rack`,
    shelfSpot: `/shelf/${storageId}/${rackId}/${shelfId}?type=shelf`
  };
  return historyUrlObj[type];
};

// RESET Storage -----------------------------
export const resetStorage = () => ({ type: RESET_STORAGE });

// ----------------------------- STORAGES --------------------------------

// GET All Storage IDS -------------------------
export const storageIdsRequested = () => ({ type: STORAGE_IDS_REQUESTED });

export const storageIdsLoaded = storageIdsEntity => ({
  type: STORAGE_IDS_LOADED,
  storageIdsEntity
});

const createEntity = storagesArray => {
  const storageIdsEntity = {};

  storagesArray.forEach(storageObj => {
    // storages --------------------------------------
    const storageId = storageObj._id;

    const storage = {
      _id: storageId,
      storageLabel: storageObj.storageLabel,
      racks: {}
    };

    // racks ------------------------------------------
    storageObj.racks.forEach(rackObj => {
      const rackId = rackObj._id;

      const rack = {
        _id: rackId,
        rackLabel: rackObj.rackLabel,
        shelves: {}
      };
      storage.racks[rackId] = rack;

      // shelves ----------------------------------------
      rackObj.shelves.forEach(shelfObj => {
        const shelfId = shelfObj._id;

        const shelf = {
          _id: shelfId,
          shelfLabel: shelfObj.shelfLabel,
          shelfSpots: {}
        };

        storage.racks[rackId].shelves[shelfId] = shelf;

        // shelfSpots ----------------------------------------
        shelfObj.shelfSpots.forEach(shelfSpotObj => {
          const shelfSpotId = shelfSpotObj._id;

          const shelfSpot = {
            _id: shelfSpotId,
            shelfSpotLabel: shelfSpotObj.shelfSpotLabel,
            boxes: []
          };

          storage.racks[rackId].shelves[shelfId].shelfSpots[
            shelfSpotId
          ] = shelfSpot;

          // boxes ---------------------------------------------
          shelfSpotObj.storedItems.forEach(storedItem => {
            if (storedItem.kind === "box") {
              const box = {
                _id: storedItem.item._id,
                boxLabel: storedItem.item.boxLabel
              };
              shelfSpot.boxes.push(box);
            }
          });
        });
      });
    });
    storageIdsEntity[storageObj._id] = storage;
  });
  return storageIdsEntity;
};

export const getStorageIds = () => async dispatch => {
  dispatch(storageIdsRequested());
  try {
    const res = await axios.get("/api/storages/ids");

    const { msg, payload, options } = res.data;

    const storageIdsEntity = createEntity(payload);
    // console.log("storageIdsEntity", storageIdsEntity);

    dispatch(storageIdsLoaded(storageIdsEntity));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetching", "storage ids");
  }
};
// Search Storages -------------------------
export const searchStoragesRequested = () => ({
  type: STORAGES_SEARCH_REQUESTED
});

export const searchStoragesLoaded = (search, storageType) => ({
  type: STORAGES_SEARCH_LOADED,
  search,
  storageType
});

export const startSearchStorages = (
  storageType,
  searchBy,
  searchText
) => async dispatch => {
  dispatch(searchStoragesRequested());
  try {
    const apiUrl = `/api/storages/search/${storageType}/${searchBy}/${searchText}`;

    const res = await axios.get(apiUrl);

    const { msg, payload } = res.data;

    dispatch(searchStoragesLoaded(payload, storageType));

    checkForMsg(msg, dispatch);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "query", `${storageType}`);
  }
};

// GET All Storages ---------------------------
export const storagesRequested = () => ({
  type: STORAGES_REQUESTED
});

export const storagesLoaded = (storages = []) => ({
  type: STORAGES_LOADED,
  storages
});

export const startGetStorages = () => async dispatch => {
  dispatch(storagesRequested());
  try {
    const res = await axios.get("/api/storages");

    const { msg, payload, options } = res.data;

    dispatch(storagesLoaded(payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "get", "storages");
  }
};

// ----------------------------- RACKS --------------------------------

// GET SINGLE RACK -----------------------------
export const rackRequested = () => ({
  type: RACK_REQUESTED
});

export const rackLoaded = rack => ({
  type: RACK_LOADED,
  rack
});

export const startGetRack = rackId => async dispatch => {
  dispatch(rackRequested());
  try {
    const res = await axios.get(`/api/racks/${rackId}`);

    const { msg, payload, options } = res.data;

    dispatch(rackLoaded(payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "get", "rack");
  }
};

// ---------------------------- UPDATES STORAGES & RACKS ----------------------------------

// New Storage -------------------------------------
export const createStorage = update => ({
  type: STORAGE_CREATE_ONE,
  update
});

export const createRack = (storageType, update) => ({
  type: RACK_CREATE_ONE,
  storageType,
  update
});

export const startCreateStorage = (
  storage,
  type,
  id = "",
  ids,
  history
) => async dispatch => {
  dispatch(showOverlay());
  try {
    const apiUrl = `${storageApiUrl(type)}/${id}`;

    const res = await axios.post(apiUrl, storage);

    const { msg, payload, options } = res.data;

    const newItemId = payload[type]._id;
    const typeId = type + "Id";

    ids[typeId] = newItemId;

    const historyUrl = mapTypeToHistoryUrl(type, ids);

    const dispatchRackActions = () => {
      dispatch(createRack(type, payload));
      dispatch(resetBox());
    };

    type === "storage"
      ? dispatch(createStorage(payload))
      : dispatchRackActions();

    checkForMsg(msg, dispatch, options);

    history.push(historyUrl);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "post", "storages");
  }
};

// Edit Storage -------------------------------------
export const editStorage = update => ({
  type: STORAGE_UPDATE_ONE,
  update
});

export const editRack = (storageType, update) => ({
  type: RACK_UPDATE_ONE,
  storageType,
  update
});

export const startEditStorage = (
  obj,
  type,
  id,
  ids,
  history
) => async dispatch => {
  dispatch(showOverlay());

  const apiUrl = `${storageApiUrl(type)}/${id}`;

  try {
    const res = await axios.patch(apiUrl, obj);

    const { msg, options, payload } = res.data;

    const historyUrl = mapTypeToHistoryUrl(type, ids);

    history.push(historyUrl);

    type === "storage"
      ? dispatch(editStorage(payload))
      : dispatch(editRack(type, payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "patch", `${type}`);
  }
};

// Delete Storage ----------------------------------
export const deleteStorage = update => ({
  type: STORAGE_DELETE_ONE,
  update
});

export const deleteRack = (type, payload) => ({
  type: RACK_DELETE_ONE,
  storageType: type,
  update: payload
});

export const startDeleteStorage = (
  type,
  id,
  ids,
  history
) => async dispatch => {
  try {
    dispatch(showOverlay());

    const apiUrl = `${storageApiUrl(type)}/${id}`;

    const res = await axios.delete(apiUrl);

    const { msg, options, payload } = res.data;

    const historyUrl = mapTypeToParentHistoryUrl(type, ids);

    history.push(historyUrl);

    type === "storage"
      ? dispatch(deleteStorage(payload))
      : dispatch(deleteRack(type, payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "delete", `${type}`);
  }
};
