import axios from "axios";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { productLoaded } from "./product";
// types

export const linkProduct = (obj, productTo, history) => async dispatch => {
  try {
    let apiUrl;

    switch (productTo) {
      case "shelfSpot":
        apiUrl = `/api/link/productToShelfSpot`;
        break;

      case "box":
        apiUrl = `/api/link/productToBox`;
        break;

      default:
        throw new Error(
          "Wrong linking type provided. A box or shelf spot type is required"
        );
    }

    const res = await axios.patch(apiUrl, obj);

    const { msg, payload, options } = res.data;

    // update store with new product
    const { product } = payload;

    dispatch(productLoaded(product));

    checkForMsg(msg, dispatch, options);

    history.push(obj.historyUrl);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "link", "product to shelf spot");
  }
};

export const linkBox = (obj, history) => async dispatch => {
  const { storageId, rackId, shelfId, shelfSpotId, boxId } = obj;

  try {
    const apiUrl = "/api/link/boxToShelfSpot";
    const res = await axios.patch(apiUrl, { boxId, shelfSpotId });
    const { msg, options } = res.data;

    checkForMsg(msg, dispatch, options);

    history.push(
      `/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type="box"`
    );
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "link", "box to shelf spot");
  }
};
