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
export const STORAGE_SEARCH = "STORAGE_SEARCH";
export const STORAGE_FETCH_ALL = "STORAGE_FETCH_ALL";
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
  const { storageId, rackId, shelfId, shelfSpotId } = ids;

  const historyUrlObj = {
    storage: "/storages",
    rack: `/storage/${storageId}?type=storage`,
    shelf: `/rack/${storageId}/${rackId}?type=rack`,
    shelfSpot: `/shelf/${storageId}/${rackId}/${shelfId}?type=shelf`
  };
  return historyUrlObj[type];
};

// RESET Storage -----------------------------
export const resetStorage = () => ({
  type: RESET_STORAGE
});

// ----------------------------- STORAGES --------------------------------

// GET All Storage IDS -------------------------
export const storageIdsRequested = () => ({
  type: STORAGE_IDS_REQUESTED
});

export const storageIdsLoaded = storageIdsEntity => ({
  type: STORAGE_IDS_LOADED,
  storageIdsEntity
});

export const getStorageIds = () => async dispatch => {
  dispatch(storageIdsRequested());
  dispatch(loading(true));
  try {
    const res = await axios.get("/api/storages/ids");

    const { msg, payload, options } = res.data;

    const storageIdsEntity = {};

    payload.forEach(storageObj => {
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

    dispatch(storageIdsLoaded(storageIdsEntity));

    checkForMsg(msg, dispatch, options);
  } catch (err) {}
};
// Search Storages -------------------------
export const searchStorages = (search, storageType) => ({
  type: STORAGE_SEARCH,
  search,
  storageType
});

export const startSearchStorages = (
  storageType,
  searchBy,
  searchText
) => async dispatch => {
  try {
    const apiUrl = `/api/storages/search/${storageType}/${searchBy}/${searchText}`;

    const res = await axios.get(apiUrl);

    const { msg, payload } = res.data;

    dispatch(searchStorages(payload, storageType));

    checkForMsg(msg, dispatch);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "query", `${storageType}`);
  }
};

// GET All Storages ---------------------------
export const getStorages = (storages = []) => ({
  type: STORAGE_FETCH_ALL,
  storages
});

export const startGetStorages = () => async dispatch => {
  dispatch(loading(true));
  try {
    const res = await axios.get("/api/storages");

    const { msg, payload, options } = res.data;

    dispatch(getStorages(payload));

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
  dispatch(loading(true));
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
  dispatch(showOverlay(true));
  try {
    const apiUrl = `${storageApiUrl(type)}/${id}`;

    const res = await axios.post(apiUrl, storage);

    const { msg, payload, options } = res.data;

    let newItemId = "";

    const { storageId, rackId, shelfId } = ids;

    let historyUrl;

    switch (type) {
      case "storage":
        newItemId = payload["storage"]._id;
        historyUrl = `/storage/${newItemId}`;
        break;

      case "rack":
        newItemId = payload["rack"]._id;
        historyUrl = `/rack/${storageId}/${newItemId}?type=${type}`;

        break;

      case "shelf":
        newItemId = payload["shelfId"];
        historyUrl = `/shelf/${storageId}/${rackId}/${newItemId}?type=${type}`;
        break;

      case "shelfSpot":
        newItemId = payload["shelfSpotId"];
        historyUrl = `/shelfSpot/${storageId}/${rackId}/${shelfId}/${newItemId}?type=${type}`;
        break;

      default:
        break;
    }

    const dispatchRackActions = () => {
      dispatch(createRack(type, payload));
      dispatch(resetBox());
    };

    type === "storage"
      ? dispatch(createStorage(payload))
      : dispatchRackActions();

    // ORDER MATTERS
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
  dispatch(showOverlay(true));

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
    dispatch(showOverlay(true));

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
