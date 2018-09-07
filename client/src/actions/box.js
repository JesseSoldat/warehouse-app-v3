import axios from "axios";

// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { loading, showOverlay } from "./ui";
// types
export const BOXES_RESET = "BOXES_RESET";
export const BOXES_REQUESTED = "BOXES_REQUESTED";
export const BOXES_LOADED = "BOXES_LOADED";
export const BOX_SEARCH = "BOX_SEARCH";
export const BOX_REQUESTED = "BOX_REQUESTED";
export const BOX_LOADED = "BOX_LOADED";
export const BOX_CREATE_ONE = "BOX_CREATE_ONE";
export const BOX_UPDATE_ONE = "BOX_UPDATE_ONE";
export const BOX_DELETE_ONE = "BOX_DELETE_ONE";

// Rest Boxes
export const resetBox = () => ({
  type: BOXES_RESET
});

// Get All Boxes
export const boxesRequested = () => ({
  type: BOXES_REQUESTED
});

export const boxesLoaded = ({ boxes, query }) => ({
  type: BOXES_LOADED,
  boxes,
  query
});

export const startGetBoxes = query => async dispatch => {
  dispatch(loading(true));
  dispatch(boxesRequested());
  try {
    const res = await axios.post("/api/boxes/search", { query });

    const { msg, options, payload } = res.data;

    dispatch(boxesLoaded(payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "get", "boxes");
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

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "get", "box");
  }
};

// CREATE BOX
export const createBox = box => ({
  type: BOX_CREATE_ONE,
  box
});

export const startCreateBox = (obj, history) => async dispatch => {
  dispatch(showOverlay(true));
  try {
    const { boxLabel, params } = obj;
    const { storageId, rackId, shelfId, shelfSpotId } = params;

    let apiUrl;

    // Manual Link allows a user to create a box and link it
    shelfSpotId
      ? (apiUrl = `/api/boxes/link/${shelfSpotId}`)
      : (apiUrl = "/api/boxes");

    const res = await axios.post(apiUrl, { boxLabel });

    const { msg, payload, options } = res.data;

    const boxId = payload._id;

    dispatch(createBox(payload));

    // ORDER MATTERS
    checkForMsg(msg, dispatch, options);

    let historyUrl;

    shelfSpotId
      ? (historyUrl = `/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=box`)
      : (historyUrl = `/box/${boxId}?type=box`);

    history.push(historyUrl);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "post", "box");
  }
};

// UPDATE BOX
export const editBox = box => ({
  type: BOX_UPDATE_ONE,
  box
});

export const startEditBox = (obj, boxId, ids, history) => async dispatch => {
  dispatch(showOverlay(true));
  try {
    const res = await axios.patch(`/api/boxes/${boxId}`, obj);

    const { msg, payload, options } = res.data;

    const { storageId, rackId, shelfId, shelfSpotId } = ids;

    let historyUrl;

    shelfSpotId
      ? (historyUrl = `/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=box`)
      : (historyUrl = `/box/${boxId}?type=box`);

    history.push(historyUrl);

    dispatch(editBox(payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "post", "box");
  }
};

// DELETE BOX
export const deleteBox = update => ({
  type: BOX_DELETE_ONE,
  update
});

export const startDeleteBox = (
  boxId,
  historyUrl,
  history
) => async dispatch => {
  try {
    dispatch(showOverlay(true));

    const res = await axios.delete(`/api/boxes/${boxId}`);

    const { msg, options, payload } = res.data;

    history.push(historyUrl);

    dispatch(deleteBox(payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "delete", "box");
  }
};
