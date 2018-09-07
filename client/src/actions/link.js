import axios from "axios";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { productLoaded } from "./product";
import { showOverlay } from "./ui";
import { resetStorage } from "./storage";
import { resetBox } from "./box";

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

// Scanning in two items need to check item types and if they are already linked to something
export const linkItems = (obj, history) => async dispatch => {
  dispatch(showOverlay(true));
  const { type1, type2, apiUrl, productId, boxId } = obj;

  try {
    const res = await axios.patch(apiUrl, obj);

    const { msg, options, payload } = res.data;

    console.log(payload);

    const { product, shelfSpot, box } = payload;

    switch (type1) {
      case "product":
        // type2 box | shelfspot
        history.push(`/products/${productId}`);
        const updatedProduct = { ...product };

        dispatch(productLoaded(updatedProduct));
        break;

      case "shelfSpot":
        history.push(createHistoryUrl(shelfSpot, "shelfSpot"));
        break;

      case "box":
        if (box && box.shelfSpot) {
          if (shelfSpot) {
            history.push(createHistoryUrl(shelfSpot, "box", boxId));
          } else {
            // No ShelfSpot in the payload get it from the Box
            history.push(createHistoryUrl(box.shelfSpot, "box", boxId));
          }
        } else {
          history.push(`/box/${boxId}?type=box`);
        }
        break;

      default:
        break;
    }

    dispatch(resetStorage());
    dispatch(resetBox());

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "link", `${type1} to ${type2}`);
  }
};
