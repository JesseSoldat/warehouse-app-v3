import axios from "axios";

// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { loading, showOverlay } from "./ui";
// types
export const GET_ALL_USERS = "GET_ALL_USERS";
export const USER_CHANGE_ROLE = "USER_CHANGE_ROLE";
export const USER_DELETE = "USER_DELETE";

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

// Change user role
export const changeUserRole = (role, email) => async dispatch => {
  dispatch(showOverlay(true));
  try {
    const res = await axios.patch("/api/changeUserRole", { email, role });

    const { msg, options, payload } = res.data;

    dispatch({ type: USER_CHANGE_ROLE, user: payload });

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    console.log("err", err);

    axiosResponseErrorHandling(err, dispatch, "change", "user-roles");
  }
};

// Delete user
export const deleteUser = email => async dispatch => {
  dispatch(showOverlay(true));
  try {
    const res = await axios.patch("/api/deleteUser", { email });

    const { msg, options, payload } = res.data;

    dispatch({ type: USER_DELETE, userId: payload.userId });

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "delete", "user");
  }
};
