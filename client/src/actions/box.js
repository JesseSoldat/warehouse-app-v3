import axios from "axios";

// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// types
export const BOXES_RESET = "BOXES_RESET";
export const BOXES_REQUESTED = "BOXES_REQUESTED";
export const BOXES_LOADED = "BOXES_LOADED";
export const BOX_SEARCH = "BOX_SEARCH";
export const BOX_REQUESTED = "BOX_REQUESTED";
export const BOX_LOADED = "BOX_LOADED";
export const BOX_CREATE_ONE = "BOX_CREATE_ONE";
export const BOX_CREATE_ONE_LINK = "BOX_CREATE_ONE_LINK";
export const BOX_UPDATE_ONE = "BOX_UPDATE_ONE";
export const BOX_DELETE_ONE = "BOX_DELETE_ONE";
export const BOX_DELETE_ONE_WITH_LOCATION = "BOX_DELETE_ONE_WITH_LOCATION";

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
  dispatch(boxesRequested());
  try {
    const res = await axios.post("/api/boxes/search", { query });

    const { msg, options, payload } = res.data;

    // payload = { boxes, query }

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

export const boxLoaded = ({ box }) => ({
  type: BOX_LOADED,
  storageType: "box",
  box
});

export const startGetBox = boxId => async dispatch => {
  dispatch(boxRequested());
  try {
    const res = await axios.get(`/api/boxes/${boxId}`);

    const { msg, options, payload } = res.data;

    // payload = { box }

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

export const createBoxAndLink = update => ({
  type: BOX_CREATE_ONE_LINK,
  update
});

export const startCreateBox = (obj, history) => async dispatch => {
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

    // payload = { box } || { box, shelfSpot }

    const boxId = payload.box._id;

    shelfSpotId
      ? dispatch(createBoxAndLink(payload))
      : dispatch(createBox(payload));

    // ORDER MATTERS
    checkForMsg(msg, dispatch, options);

    let historyUrl;

    shelfSpotId
      ? (historyUrl = `/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=box`)
      : (historyUrl = `/box/${boxId}?type=box`);

    history.push(historyUrl);
  } catch (err) {
    console.log("Box Action - startCreateBox Err:", err);
    axiosResponseErrorHandling(err, dispatch, "post", "box");
  }
};

// UPDATE BOX
export const editBox = update => ({
  type: BOX_UPDATE_ONE,
  update
});

export const startEditBox = (obj, boxId, ids, history) => async dispatch => {
  try {
    const res = await axios.patch(`/api/boxes/${boxId}`, obj);

    const { msg, payload, options } = res.data;

    // payload = { box }

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

export const deleteBoxWithLocation = update => ({
  type: BOX_DELETE_ONE_WITH_LOCATION,
  update
});

export const startDeleteBox = (
  boxId,
  historyUrl,
  shelfSpotId,
  history
) => async dispatch => {
  try {
    // No Location
    let apiUrl = `/api/boxes/${boxId}`;
    // Location
    if (shelfSpotId) apiUrl = `/api/boxes/${shelfSpotId}/${boxId}`;

    const res = await axios.delete(apiUrl);

    const { msg, options, payload } = res.data;

    // payload = { boxId }

    history.push(historyUrl);

    shelfSpotId
      ? dispatch(deleteBoxWithLocation(payload))
      : dispatch(deleteBox(payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "delete", "box");
  }
};
