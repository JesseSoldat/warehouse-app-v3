import axios from "axios";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";

export const UNLINK_PRODUCT_FROM_BOX = "UNLINK_PRODUCT_FROM_BOX";
export const UNLINK_PRODUCT_FROM_SHELFSPOT = "UNLINK_PRODUCT_FROM_SHELFSPOT";
export const UNLINK_BOX_FROM_SHELFSPOT = "UNLINK_BOX_FROM_SHELFSPOT";

const unLinkItemLogger = (method, apiUrl, payload) => {
  console.log("---------------- unLinkItems ---------------------");
  console.log(method);
  console.log("Api Url:", apiUrl);
  console.log("PayLoad:", payload);
  console.log("-------------------------------------------");
};

// Unlink Product From Box
export const unlinkProductFromBox = update => ({
  type: UNLINK_PRODUCT_FROM_BOX,
  update
});

export const startUnlinkProductFromBox = boxAndProductIds => async dispatch => {
  const apiUrl = "/api/unlink/productFromBox";

  try {
    const res = await axios.patch(apiUrl, boxAndProductIds);

    const { msg, options, payload } = res.data;

    unLinkItemLogger("startUnlinkProductFromBox", apiUrl, payload);

    const { box, product } = payload;

    dispatch(unlinkProductFromBox({ box, product }));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    console.log("Err: Unlink Action - startUnlinkProductFromBox", err);

    axiosResponseErrorHandling(err, dispatch, "unlink", "product from box");
  }
};

// Unlink Product From ShelfSpot
export const unlinkProductFromShelfSpot = update => ({
  type: UNLINK_PRODUCT_FROM_SHELFSPOT,
  update
});

export const startUnlinkProductFromShelfSpot = shelfSpotAndProductIds => async dispatch => {
  const apiUrl = "/api/unlink/productFromShelfSpot";

  try {
    const res = await axios.patch(apiUrl, shelfSpotAndProductIds);

    const { msg, options, payload } = res.data;

    unLinkItemLogger("startUnlinkProductFromShelfSpot", apiUrl, payload);

    const { shelfSpot, product } = payload;

    dispatch(unlinkProductFromShelfSpot({ shelfSpot, product }));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    console.log("Err: Unlink Action - startUnlinkProductFromShelfSpot", err);
    axiosResponseErrorHandling(
      err,
      dispatch,
      "unlink",
      "product from shelf spot"
    );
  }
};

// Unlink Box From ShelfSpot
export const unlinkBoxFromShelfSpot = update => ({
  type: UNLINK_BOX_FROM_SHELFSPOT,
  update
});

export const startUnlinkBoxFromShelfSpot = (obj, history) => async dispatch => {
  try {
    const apiUrl = "/api/unlink/boxFromShelfSpot";
    const res = await axios.patch(apiUrl, obj);

    const { msg, options, payload } = res.data;

    unLinkItemLogger("startUnlinkBoxFromShelfSpot", apiUrl, payload);

    const { box, shelfSpot } = payload;

    history.push(`/box/${obj.boxId}`);

    dispatch(unlinkBoxFromShelfSpot({ box, shelfSpot }));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    console.log("Err: Unlink Actions - startUnlinkBoxFromShelfSpot", err);

    axiosResponseErrorHandling(err, dispatch, "unlink", "box from shelf spot");
  }
};
