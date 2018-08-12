import axios from "axios";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { loading } from "./ui";
import { productLoaded } from "./product";
// types

export const linkProduct = (obj, history) => async dispatch => {
  try {
    const { productId, type } = obj;
    let apiUrl;

    switch (type) {
      case "shelfSpot":
      case "product":
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

    history.push(`/products/${productId}`);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "link", "product to shelf spot");
  }
};
