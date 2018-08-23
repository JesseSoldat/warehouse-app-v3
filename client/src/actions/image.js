import axios from "axios";

// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { showOverlay } from "./ui";
import { productLoaded } from "./product";

export const uploadImage = (url, type, product) => async dispatch => {
  try {
    const { _id: productId } = product;

    const res = await axios.post(`/api/uploadProductImage/${productId}`, {
      url,
      type
    });

    const { msg, options } = res.data;

    const newProduct = { ...product };

    type === "productPictures"
      ? newProduct.productPictures.push(url)
      : newProduct.packagingPictures.push(url);

    dispatch(productLoaded(newProduct));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "save", "image");
  }
};

export const deleteImage = (url, type, product) => async dispatch => {
  try {
    dispatch(showOverlay(true));
    const res = await axios.patch(`/api/deleteProductImage/${product._id}`, {
      type,
      url
    });

    const { msg, options } = res.data;

    const newProduct = { ...product };

    if (type === "productPictures") {
      const index = newProduct.productPictures.indexOf(url);

      if (index >= 0) newProduct.productPictures.splice(index, 1);
    } else {
      const index = newProduct.packagingPictures.indexOf(url);

      if (index >= 0) newProduct.packagingPictures.splice(index, 1);
    }

    dispatch(productLoaded(newProduct));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    console.log("ERR", err);

    axiosResponseErrorHandling(err, dispatch, "delete", "image");
  }
};
