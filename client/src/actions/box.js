import axios from "axios";

// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { loading, showOverlay } from "./ui";
// types
export const BOXES_REQUESTED = "BOXES_REQUESTED";
export const BOXES_LOADED = "BOXES_LOADED";
export const BOX_SEARCH = "BOX_SEARCH";
export const BOX_REQUESTED = "BOX_REQUESTED";
export const BOX_LOADED = "BOX_LOADED";
export const BOX_DELETE_ONE = "BOX_DELETE_ONE";

// Get All Boxes
export const boxesRequested = () => ({
  type: BOXES_REQUESTED
});

export const boxesLoaded = boxes => ({
  type: BOXES_LOADED,
  boxes
});

export const startGetBoxes = query => async dispatch => {
  dispatch(loading(true));
  dispatch(boxesRequested());
  try {
    const res = await axios.post(`/api/boxes`, { query });

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
