import axios from "axios";

// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { loading } from "./ui";
// types
export const GET_ALL_USERS = "GET_ALL_USERS";

// Get all users -----------------------------
export const getAllUsers = payload => ({
  type: GET_ALL_USERS,
  allUsers: payload
});

export const startGetAllUsers = () => async dispatch => {
  dispatch(loading(true));
  try {
    const res = await axios.get("/api/users");
    const { msg, payload, options } = res.data;

    dispatch(getAllUsers(payload));
    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "users");
  }
};
