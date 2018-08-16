import axios from "axios";

// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
import storageApiUrl from "./helpers/storageApiUrl";
// actions
import { loading, showOverlay } from "./ui";
// types
export const STORAGE_SEARCH = "STORAGE_SEARCH";
export const STORAGE_FETCH_ALL = "STORAGE_FETCH_ALL";
export const STORAGE_CREATE_ONE = "STORAGE_CREATE_ONE";
export const STORAGE_UPDATE_ONE = "STORAGE_UPDATE_ONE";

export const STORAGE_IDS_REQUESTED = "STORAGE_IDS_REQUESTED";
export const STORAGE_IDS_LOADED = "STORAGE_IDS_LOADED";

export const RACK_REQUESTED = "RACK_REQUESTED";
export const RACK_LOADED = "RACK_LOADED";
export const RACK_CREATE_ONE = "RACK_CREATE_ONE";
export const RACK_UPDATE_ONE = "RACK_UPDATE_ONE";

export const BOX_REQUESTED = "BOX_REQUESTED";
export const BOX_LOADED = "BOX_LOADED";

export const STORAGE_FETCH_ONE = "STORAGE_FETCH_ONE";
export const STORAGE_DELETE_ONE = "STORAGE_DELETE_ONE";

export const RESET_STORAGE = "RESET_STORAGE";
// RESET Storage -----------------------------
export const resetStorage = () => ({
  type: RESET_STORAGE
});

// GET Storage IDS -------------------------
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
  searchText,
  history
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

// GET Storages ---------------------------
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

// GET SINGLE BOX
export const boxRequested = () => ({
  type: BOX_REQUESTED
});

export const boxLoaded = box => ({
  type: BOX_LOADED,
  storageType: "box",
  box
});

export const startGetBox = boxId => async dispatch => {
  dispatch(loading(true));
  dispatch(boxRequested());
  try {
    const res = await axios.get(`/api/boxes/${boxId}`);

    const { msg, options, payload } = res.data;

    dispatch(boxLoaded(payload));
    dispatch(loading(false));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "get", "box");
  }
};

// GET Storage ---------------------------
export const getStorage = (storage = null, storageType = "") => ({
  type: STORAGE_FETCH_ONE,
  storage,
  storageType
});

export const startGetStorage = (id = "", storageType) => async dispatch => {
  dispatch(loading(true));

  const apiUrl = `${storageApiUrl(storageType)}/${id}`;

  try {
    const res = await axios.get(apiUrl);

    const { msg, payload, options } = res.data;

    dispatch(getStorage(payload, storageType));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "get", `${storageType}`);
  }
};

// New Storage -------------------------------------
export const createStorage = storage => ({
  type: STORAGE_CREATE_ONE,
  storage
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
  const apiUrl = `${storageApiUrl(type)}/${id}`;
  try {
    const res = await axios.post(apiUrl, storage);

    const { msg, payload, options } = res.data;

    let newItemId = "";

    const { storageId, rackId, shelfId } = ids;

    switch (type) {
      case "storage":
        newItemId = payload._id;
        dispatch(createStorage(payload));
        history.push(`/storage/${newItemId}?type=${type}`);
        break;

      case "rack":
        newItemId = payload[type]._id;
        dispatch(createRack(type, payload));
        history.push(`/rack/${storageId}/${newItemId}?type=${type}`);
        break;

      case "shelf":
        newItemId = payload[type]._id;
        dispatch(createRack(type, payload));
        history.push(`/shelf/${storageId}/${rackId}/${newItemId}?type=${type}`);
        break;

      case "shelfSpot":
        newItemId = payload[type]._id;
        dispatch(createRack(type, payload));
        history.push(
          `/shelfSpot/${storageId}/${rackId}/${shelfId}/${newItemId}?type=${type}`
        );
        break;

      case "box":
        newItemId = payload._id;
        history.push(`/box/${newItemId}?type=${type}`);
        break;

      default:
        break;
    }
    checkForMsg(msg, dispatch, options);

    dispatch(showOverlay(false));
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "post", "storages");
  }
};

// Edit Storage -------------------------------------
export const editStorage = storage => ({
  type: STORAGE_UPDATE_ONE,
  storage
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

    const { storageId, rackId, shelfId, shelfSpotId } = ids;

    switch (type) {
      case "storage":
        dispatch(editStorage(payload));
        history.push(`/storage/${storageId}?type=${type}`);
        break;

      case "rack":
        dispatch(editRack(type, payload));
        history.push(`/rack/${storageId}/${rackId}?type=${type}`);
        break;

      case "shelf":
        dispatch(editRack(type, payload));
        history.push(`/shelf/${storageId}/${rackId}/${shelfId}?type=${type}`);
        break;

      case "shelfSpot":
        dispatch(editRack(type, payload));
        history.push(
          `/shelfSpot/${storageId}/${rackId}/${shelfId}/${shelfSpotId}?type=${type}`
        );
        break;

      default:
        break;
    }
    checkForMsg(msg, dispatch, options);

    dispatch(showOverlay(false));
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "patch", `${type}`);
  }
};

// Delete Storage ----------------------------------
export const deleteStorage = () => ({
  type: STORAGE_DELETE_ONE
});

export const startDeleteStorage = (type, id, history) => async dispatch => {
  try {
    dispatch(showOverlay(true));

    const apiUrl = `${storageApiUrl(type)}/${id}`;
    console.log(apiUrl);

    const res = await axios.delete(apiUrl);

    const { msg, options } = res.data;

    dispatch(deleteStorage());

    checkForMsg(msg, dispatch, options);

    dispatch(showOverlay(false));

    history.push(`/storages`);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "delete", `${type}`);
  }
};
