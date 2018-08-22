import axios from "axios";

// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions

export const uploadImage = (file, productId, history) => async dispatch => {
  try {
    let data = new FormData();
    data.append("file", file);
    data.append("name", file.name);

    const res = await axios.post("/api/uploadProductImage", data);

    const { msg, options } = res.data;

    checkForMsg(msg, dispatch, options);

    history.push(`products/${productId}`);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "save", "image");
  }
};
