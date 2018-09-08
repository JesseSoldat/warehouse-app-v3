import axios from "axios";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { productLoaded } from "./product";
import { showOverlay } from "./ui";
import { resetStorage } from "./storage";
import { resetBox } from "./box";
// types
export const LINK_PRODUCT_TO_SHELFSPOT = "LINK_PRODUCT_TO_SHELFSPOT";

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

export const linkProductToShelfSpot = update => ({
  type: LINK_PRODUCT_TO_SHELFSPOT,
  update
});

// Scanning in two items need to check item types and if they are already linked to something
export const linkItems = (obj, history) => async dispatch => {
  dispatch(showOverlay(true));
  const { type1, type2, apiUrl, productId, boxId } = obj;

  try {
    const res = await axios.patch(apiUrl, obj);

    const { msg, options, payload } = res.data;

    console.log("action payload", payload);

    const { product, shelfSpot, box } = payload;

    switch (type1) {
      case "product":
        history.push(`/products/${productId}`);

        switch (apiUrl) {
          // ------- API = { shelfSpot, product } --------------
          // FROM PRODUCT DETAILS
          case "/api/link/productToShelfSpot":
          case "/api/relink/productToShelfSpot":
            dispatch(linkProductToShelfSpot(shelfSpot));
            break;

          default:
            break;
        }
        // ---------- API = { box, product } ----------------
        // "/api/link/productToBox"
        // "/api/relink/productToBox"
        // "/api/scan/productToBox"

        // update product
        // update rack with update shelfspot

        // "/api/scan/productToShelfSpot"

        // const updatedProduct = { ...product };

        dispatch(productLoaded(product));

        // ------------- Box has location ---------------------
        // update box
        // boxes = []
        // find rack with the box and update the box

        // ------------- Box no location ---------------------
        // update box
        // boxes = []

        // ------------- ShelfSpot --------------------------
        // populate the shelfspot
        // find rack with the shelfspot update product info
        break;

      case "shelfSpot":
        history.push(createHistoryUrl(shelfSpot, "shelfSpot"));
        break;

      case "box":
        // ------- API = { shelfSpot, box } --------------
        // "/api/link/boxToShelfSpot"
        // "/api/scan/boxToShelfSpot"

        // ------------- Box has location ---------------------
        // update box
        // boxes = []
        // find rack from shelfspot info and update the box

        // ------------- Box no location ---------------------
        // update box
        // boxes = []

        // ------------- ShelfSpot --------------------------
        // populate the shelfspot
        // find rack with the shelfspot update box info

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

    // dispatch(resetStorage());
    // dispatch(resetBox());

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "link", `${type1} to ${type2}`);
  }
};
