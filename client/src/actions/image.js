import axios from "axios";

// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
// import { showOverlay } from "./ui";

export const uploadImage = (url, type, productId) => async dispatch => {
  try {
    const res = await axios.post(`/api/uploadProductImage/${productId}`, {
      url,
      type
    });

    const { msg, options } = res.data;

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "save", "image");
  }
};
