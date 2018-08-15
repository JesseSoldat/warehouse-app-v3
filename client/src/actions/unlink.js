import axios from "axios";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { productLoaded } from "./product";
import { showOverlay } from "./ui";

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

    // update store with new data
    const updatedProduct = { ...product };
    updatedProduct.productLocation = {};

    dispatch(productLoaded(updatedProduct));

    const { msg, options } = res.data;

    checkForMsg(msg, dispatch, options);

    dispatch(showOverlay(false));
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "unlink", errMsg);
  }
};
