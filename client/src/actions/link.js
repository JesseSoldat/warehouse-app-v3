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

    console.log(product.productLocation);

    history.push(obj.historyUrl);

    const updatedProduct = { ...product };

    dispatch(productLoaded(updatedProduct));

    dispatch(resetStorage());

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
  dispatch(showOverlay(true));

  const { shelfSpotId, boxId } = obj;

  try {
    const res = await axios.patch("/api/link/boxToShelfSpot", {
      boxId,
      shelfSpotId
    });

    const { msg, options, payload } = res.data;

    const { shelfSpot } = payload;

    if (shelfSpot && shelfSpot.shelf) {
      const shelfId = shelfSpot.shelf._id;
      const rackId = shelfSpot.shelf.rack._id;
      const storageId = shelfSpot.shelf.rack.storage._id;

      history.push(
        `/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type="box"`
      );
    } else {
      history.push(`/box/${boxId}?type="box`);
    }
    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "link", "box to shelf spot");
  }
};

// Scanning in two items need to check item types and if they are already linked to something
export const linkTwoItems = (obj, history) => async dispatch => {
  const { type1, type2, apiUrl, productId, boxId } = obj;

  dispatch(showOverlay(true));

  try {
    const res = await axios.patch(apiUrl, obj);

    const { msg, options, payload } = res.data;

    console.log(payload);

    switch (type1) {
      case "product":
        history.push(`/products/${productId}`);
        break;

      case "shelfSpot":
        const { shelfSpot } = payload;
        const shelfSpotId = shelfSpot._id;
        const shelfId = shelfSpot.shelf._id;
        const rackId = shelfSpot.shelf.rack._id;
        const storageId = shelfSpot.shelf.rack.storage._id;

        history.push(
          `/shelfSpot/${storageId}/${rackId}/${shelfId}/${shelfSpotId}?type=shelfSpot`
        );

        break;

      case "box":
        const { box } = payload;

        if (box && box.shelfSpot) {
          const { shelfSpot } = payload;
          const shelfSpotId = shelfSpot._id;
          const shelfId = shelfSpot.shelf._id;
          const rackId = shelfSpot.shelf.rack._id;
          const storageId = shelfSpot.shelf.rack.storage._id;

          const historyUrl = `/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=box`;

          history.push(historyUrl);
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
