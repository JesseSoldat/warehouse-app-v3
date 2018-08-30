import axios from "axios";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { productLoaded } from "./product";
import { showOverlay } from "./ui";
import { resetStorage } from "./storage";

// helpers --------------------------------------------------------------------
const createHistoryUrl = (shelfSpot, type, boxId) => {
  const shelfSpotId = shelfSpot._id;
  const shelfId = shelfSpot.shelf._id;
  const rackId = shelfSpot.shelf.rack._id;
  const storageId = shelfSpot.shelf.rack.storage._id;

  if (type === "shelfSpot") {
    return `/shelfSpot/${storageId}/${rackId}/${shelfId}/${shelfSpotId}?type=shelfSpot`;
  }
  return `/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=box`;
};

// Product --------------------------------------------------------------
export const linkProduct = (obj, history) => async dispatch => {
  dispatch(showOverlay(true));

  const { apiUrl, historyUrl, info } = obj;

  try {
    const res = await axios.patch(apiUrl, obj);

    const { msg, payload, options } = res.data;

    // update store with new product
    const { product } = payload;

    // TODO
    history.push(historyUrl);

    const updatedProduct = { ...product };

    dispatch(productLoaded(updatedProduct));

    dispatch(resetStorage());

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "link", info);
  }
};

// Box ---------------------------------------------------------------------
export const linkBox = (obj, history) => async dispatch => {
  dispatch(showOverlay(true));
  const { apiUrl, boxId } = obj;

  try {
    const res = await axios.patch(apiUrl, obj);

    const { msg, options, payload } = res.data;

    const { shelfSpot } = payload;

    if (shelfSpot && shelfSpot.shelf) {
      history.push(createHistoryUrl(shelfSpot, "box", boxId));
    } else {
      history.push(`/box/${boxId}?type="box`);
    }
    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "link", "box to shelf spot");
  }
};

// Scanning in two items need to check item types and if they are already linked to something
export const linkItems = (obj, history) => async dispatch => {
  dispatch(showOverlay(true));
  const { type1, type2, apiUrl, productId, boxId } = obj;

  try {
    const res = await axios.patch(apiUrl, obj);

    const { msg, options, payload } = res.data;

    console.log(payload);

    switch (type1) {
      case "product":
        history.push(`/products/${productId}`);
        break;

      case "shelfSpot":
        history.push(createHistoryUrl(payload.shelfSpot, "shelfSpot"));
        break;

      case "box":
        const { box, shelfSpot } = payload;

        if (box && box.shelfSpot) {
          history.push(createHistoryUrl(shelfSpot, "box", boxId));
        } else {
          history.push(`/box/${boxId}?type=box`);
        }

        break;

      default:
        break;
    }

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "link", `${type1} to ${type2}`);
  }
};
