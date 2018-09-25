import axios from "axios";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { productLoaded } from "./product";
import { resetBox } from "./box";

export const UNLINK_PRODUCT_FROM_BOX = "UNLINK_PRODUCT_FROM_BOX";
export const UNLINK_PRODUCT_FROM_SHELFSPOT = "UNLINK_PRODUCT_FROM_SHELFSPOT";
export const UNLINK_BOX_FROM_SHELFSPOT = "UNLINK_BOX_FROM_SHELFSPOT";

// Unlink Product From Box
export const unlinkProductFromBox = update => ({
  type: UNLINK_PRODUCT_FROM_BOX,
  update
});

// TODO
export const startUnlinkProductFromBox = boxAndProductIds => async dispatch => {
  const apiUrl = "/api/unlink/productFromBox";

  try {
    const res = await axios.patch(apiUrl, boxAndProductIds);

    const { msg, options, payload } = res.data;

    // payload = { box, product }

    const { box, product } = payload;

    console.log("startUnlinkProductFromBox");
    console.log("Payload", payload);

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

export const startUnlinkProductFromShelfSpot = (
  obj,
  product
) => async dispatch => {
  const apiUrl = "/api/unlink/productFromShelfSpot";

  try {
    const res = await axios.patch(apiUrl, obj);

    const { msg, options, payload } = res.data;

    console.log("startUnlinkProductFromShelfSpot");
    console.log("Payload", payload);

    const { shelfSpot } = payload;

    const updatedProduct = { ...product };

    dispatch(productLoaded(updatedProduct));
    dispatch(unlinkProductFromShelfSpot({ shelfSpot }));
    dispatch(resetBox());

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
    const res = await axios.patch("/api/unlink/boxFromShelfSpot", obj);

    const { msg, options, payload } = res.data;

    console.log("startUnlinkBoxFromShelfSpot");
    console.log("Payload", payload);

    const { box, shelfSpot } = payload;

    history.push(`/box/${obj.boxId}`);

    dispatch(unlinkBoxFromShelfSpot({ box, shelfSpot }));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    console.log("Err: Unlink Actions - startUnlinkBoxFromShelfSpot", err);

    axiosResponseErrorHandling(err, dispatch, "unlink", "box from shelf spot");
  }
};
