import axios from "axios";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { productLoaded } from "./product";
import { showOverlay } from "./ui";
import { resetBox } from "./box";

export const UNLINK_PRODUCT_FROM_SHELFSPOT = "UNLINK_PRODUCT_FROM_SHELFSPOT";

export const unlinkProductFromShelfSpot = update => ({
  type: UNLINK_PRODUCT_FROM_SHELFSPOT,
  update
});

export const unlinkProduct = (obj, product) => async dispatch => {
  let apiUrl, errMsg;

  dispatch(showOverlay(true));

  try {
    switch (obj.kind) {
      case "shelfSpot":
        apiUrl = `/api/unlink/productFromShelfSpot`;
        errMsg = "product from shelf spot";
        break;
      case "box":
        apiUrl = `/api/unlink/productFromBox`;
        errMsg = "product from box";
        break;
      default:
        throw new Error("An error occured while trying to unlink the product.");
    }

    const res = await axios.patch(apiUrl, obj);

    const { msg, options, payload } = res.data;

    const { shelfSpot } = payload;

    const updatedProduct = { ...product };
    updatedProduct.productLocation = {};

    dispatch(productLoaded(updatedProduct));
    dispatch(unlinkProductFromShelfSpot({ shelfSpot }));
    dispatch(resetBox());

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "unlink", errMsg);
  }
};

export const unlinkBox = (obj, history) => async dispatch => {
  dispatch(showOverlay(true));

  try {
    const res = await axios.patch("/api/unlink/boxFromShelfSpot", obj);

    const { msg, options } = res.data;

    history.push(`/box/${obj.boxId}?type=box`);

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "unlink", "box from shelf spot");
  }
};
