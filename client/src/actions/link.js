import axios from "axios";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// types
export const LINK_PRODUCT_TO_SHELFSPOT = "LINK_PRODUCT_TO_SHELFSPOT";
export const LINK_PRODUCT_TO_BOX = "LINK_PRODUCT_TO_BOX";
export const LINK_BOX_TO_SHELFSPOT = "LINK_BOX_TO_SHELFSPOT";
export const RE_LINK_PRODUCT_TO_SHELFSPOT = "RE_LINK_PRODUCT_TO_SHELFSPOT";
export const RE_LINK_PRODUCT_TO_BOX = "RE_LINK_PRODUCT_TO_BOX";
export const RE_LINK_BOX_TO_SHELFSPOT = "RE_LINK_BOX_TO_SHELFSPOT";
// export const SCAN_PRODUCT_TO_SHELFSPOT = "SCAN_PRODUCT_TO_SHELFSPOT";
// export const SCAN_PRODUCT_TO_BOX = "SCAN_PRODUCT_TO_BOX";
// export const SCAN_BOX_TO_SHELFSPOT = "SCAN_BOX_TO_SHELFSPOT";

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

// ----------------- Link -------------------------
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

// -------------- Re-Link --------------------
export const reLinkProductToShelfSpot = update => ({
  type: RE_LINK_PRODUCT_TO_SHELFSPOT,
  update
});

export const reLinkProductToBox = update => ({
  type: RE_LINK_PRODUCT_TO_BOX,
  update
});

export const reLinkBoxToShelfSpot = update => ({
  type: RE_LINK_BOX_TO_SHELFSPOT,
  update
});

const linkItemLogger = (type1, type2, apiUrl, payload) => {
  console.log("---------------- linkItems ---------------------");
  console.log(`Link ${type1} to ${type2}`);
  console.log("Api Url:", apiUrl);
  console.log("PayLoad:", payload);
  console.log("-------------------------------------------");
};
// Scan || Manual Link two items - check item types - are already linked?
export const linkItems = (obj, history) => async dispatch => {
  const { type1, type2, apiUrl, productId, boxId } = obj;

  try {
    const res = await axios.patch(apiUrl, obj);

    const { msg, options, payload } = res.data;

    linkItemLogger(type1, type2, apiUrl, payload);

    const { product, shelfSpot, box } = payload;

    switch (type1) {
      // Product -----------------------------------------------
      case "product":
        history.push(`/products/${productId}`);

        switch (apiUrl) {
          // ----- From Product Details  || Scan Two Items --------
          // ------- API = { shelfSpot, product } --------------
          case "/api/link/productToShelfSpot":
            dispatch(linkProductToShelfSpot({ shelfSpot, product }));
            break;

          case "/api/relink/productToShelfSpot":
          case "/api/scan/productToShelfSpot":
            dispatch(reLinkProductToShelfSpot({ shelfSpot, product }));
            break;
          // ------- API = { box, product } --------------
          case "/api/link/productToBox":
            dispatch(linkProductToBox({ box, product }));
            break;

          case "/api/relink/productToBox":
          case "/api/scan/productToBox":
            dispatch(reLinkProductToBox({ box, product }));
            break;

          default:
            break;
        }

        break;
      // -------------- From Scan Two Items ------------------
      case "shelfSpot":
        history.push(createHistoryUrl(shelfSpot, "shelfSpot"));

        switch (apiUrl) {
          case "/api/scan/productToShelfSpot":
            dispatch(reLinkProductToShelfSpot({ shelfSpot, product }));
            break;

          case "/api/scan/boxToShelfSpot":
            dispatch(reLinkBoxToShelfSpot({ box, shelfSpot }));
            break;

          default:
            break;
        }

        break;

      case "box":
        // Create Url and Redirect
        checkBoxUrlType(shelfSpot, box, boxId, history);

        switch (apiUrl) {
          // -------- From Box Details || Scan Two Items -------
          // ------- API = { box, product } --------------
          case "/api/link/productToBox":
            dispatch(linkProductToBox({ box, product }));
            break;

          case "/api/scan/productToBox":
            dispatch(reLinkProductToBox({ box, product }));
            break;

          // ------- API = { shelfSpot, box } --------------
          case "/api/link/boxToShelfSpot":
            dispatch(linkBoxToShelfSpot({ box, shelfSpot }));
            break;

          case "/api/scan/boxToShelfSpot":
            dispatch(reLinkBoxToShelfSpot({ box, shelfSpot }));
            break;

          default:
            break;
        }
        break;

      default:
        console.log(`Link ${type1} to ${type2}`);
        console.log(
          "ERROR: linkItems action was not provided with a correct TYPE1 property of product | box | shelfSpot"
        );
        break;
    }

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    console.log("Err: Link Action - linkItems", err);

    axiosResponseErrorHandling(err, dispatch, "link", `${type1} to ${type2}`);
  }
};
