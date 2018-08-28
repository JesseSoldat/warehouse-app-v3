import axios from "axios";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { productLoaded } from "./product";
import { showOverlay } from "./ui";
import { resetStorage } from "./storage";

export const linkProduct = (obj, productTo, history) => async dispatch => {
  let apiUrl, info;
  dispatch(showOverlay(true));

  try {
    switch (productTo) {
      case "shelfSpot":
        apiUrl = `/api/link/productToShelfSpot`;
        info = "product to shelf spot";
        break;

      case "box":
        apiUrl = `/api/link/productToBox`;
        info = "product to box";
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

    dispatch(resetStorage());

    history.push(obj.historyUrl);

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "link", info);
  }
};

export const relinkProduct = (
  obj,
  productTo,
  prevLocation,
  history
) => async dispatch => {
  let apiUrl, info;

  dispatch(showOverlay(true));

  try {
    switch (productTo) {
      case "shelfSpot":
        apiUrl = `/api/relink/productToShelfSpot`;
        info = "product to shelf spot";
        break;

      case "box":
        apiUrl = `/api/relink/productToBox`;
        info = "product to box";
        break;

      default:
        throw new Error(
          "Wrong linking type provided. A box or shelf spot type is required"
        );
    }

    const res = await axios.patch(apiUrl, { obj, prevLocation });

    const { msg, payload, options } = res.data;

    // update store with new product
    const { product } = payload;

    dispatch(productLoaded(product));

    checkForMsg(msg, dispatch, options);

    dispatch(showOverlay(false));

    history.push(obj.historyUrl);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "relink", info);
  }
};

export const linkBox = (obj, history) => async dispatch => {
  const { storageId, rackId, shelfId, shelfSpotId, boxId } = obj;

  dispatch(showOverlay(true));

  try {
    const apiUrl = "/api/link/boxToShelfSpot";
    const res = await axios.patch(apiUrl, { boxId, shelfSpotId });
    const { msg, options } = res.data;

    checkForMsg(msg, dispatch, options);

    dispatch(showOverlay(false));

    history.push(
      `/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type="box"`
    );
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "link", "box to shelf spot");
  }
};

// Scanning in two items need to check item types and if they are already linked to something
export const linkTwoItems = (obj, history) => async dispatch => {};
