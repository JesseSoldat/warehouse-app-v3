import axios from "axios";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { productLoaded } from "./product";
// types
export const LINK_PRODUCT_TO_SHELFSPOT = "LINK_PRODUCT_TO_SHELFSPOT";
export const LINK_PRODUCT_TO_BOX = "LINK_PRODUCT_TO_BOX";
export const LINK_BOX_TO_SHELFSPOT = "LINK_BOX_TO_SHELFSPOT";

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

const checkBoxUrlType = (shelfSpot, box, boxId, history) => {
  let url = `/box/${boxId}?type=box`;
  if (box && box.shelfSpot) {
    shelfSpot
      ? (url = createHistoryUrl(shelfSpot, "box", boxId))
      : (url = createHistoryUrl(box.shelfSpot, "box", boxId));
  }
  history.push(url);
};

export const linkProductToShelfSpot = update => ({
  type: LINK_PRODUCT_TO_SHELFSPOT,
  update
});

export const linkProductToBox = update => ({
  type: LINK_PRODUCT_TO_BOX,
  update
});

export const linkBoxToShelfSpot = update => ({
  type: LINK_BOX_TO_SHELFSPOT,
  update
});

// SCAN || MANUAL LINK two items - check item types - arre already linked?
export const linkItems = (obj, history) => async dispatch => {
  const { type1, type2, apiUrl, productId, boxId } = obj;

  try {
    const res = await axios.patch(apiUrl, obj);

    const { msg, options, payload } = res.data;

    console.log("linkItems action", payload);

    const { product, shelfSpot, box } = payload;

    switch (type1) {
      case "product":
        history.push(`/products/${productId}`);

        switch (apiUrl) {
          // --------------- FROM PRODUCT DETAILS -----------------
          // ------- API = { shelfSpot, product } --------------
          case "/api/link/productToShelfSpot":
          case "/api/relink/productToShelfSpot":
            dispatch(linkProductToShelfSpot({ shelfSpot }));
            dispatch(productLoaded(product));
            break;
          // ------- API = { box, product } --------------
          case "/api/link/productToBox":
          case "/api/relink/productToBox":
            dispatch(linkProductToBox({ box }));
            dispatch(productLoaded(product));

            break;

          default:
            break;
        }
        // ---------------- SCAN -------------------------
        // "/api/scan/productToBox"
        // "/api/scan/productToShelfSpot"
        // "/api/scan/boxToShelfSpot"

        break;

      case "shelfSpot":
        history.push(createHistoryUrl(shelfSpot, "shelfSpot"));

        // ------------- ShelfSpot --------------------------
        // populate the shelfspot
        // find rack with the shelfspot update product info

        break;

      case "box":
        // ---------------- CREATE BOX HISTORY URL -----------------------
        checkBoxUrlType(shelfSpot, box, boxId, history);

        switch (apiUrl) {
          // --------------- FROM BOX DETAILS ----------------------
          // ------- API = { box, product } --------------
          case "/api/link/productToBox":
            dispatch(linkBoxToShelfSpot({ box }));
            break;
          // ------- API = { shelfSpot, box } --------------
          case "/api/link/boxToShelfSpot":
            dispatch(linkBoxToShelfSpot({ box, shelfSpot }));
            break;

          default:
            break;
        }
        break;

      default:
        console.log(
          "ERROR: linkItems action was not provided with a correct TYPE1 property of product | box | shelfSpot"
        );
        break;
    }
    console.log("FINISHED ACTION CODE");

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "link", `${type1} to ${type2}`);
  }
};
