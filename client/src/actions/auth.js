import axios from "axios";

// utils
import setAxiosHeader from "../utils/setAxiosHeader";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// types
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const startRegister = (user, history) => async dispatch => {
  try {
    const res = await axios.post("/api/register", user);

    const { msg, options } = res.data;

    checkForMsg(msg, dispatch, options);

    history.push("/login");
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "register", "user");
  }
};

export const login = (_id, token) => ({
  type: AUTH_LOGIN,
  _id,
  token
});

export const startLogin = user => async dispatch => {
  try {
    const res = await axios.post("/api/login", user);

    const { msg, payload, options } = res.data;

    if (payload) {
      const { _id, token, expires } = payload;

      // axios headers
      setAxiosHeader(token);
      // set user to local storage
      localStorage.setItem("user", JSON.stringify({ _id, token, expires }));

      dispatch(login(_id, token));
    }

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "login", "user");
  }
};

export const startResendVerification = email => async dispatch => {
  try {
    const res = await axios.post("/api/resendVerification", { email });
    const { msg, options } = res.data;

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "resend", "verification email");
  }
};

export const startLogout = () => async dispatch => {
  try {
    const res = await axios.delete("/api/logout");
    const { msg, options } = res.data;
    // axios headers
    setAxiosHeader(null);
    // remove user to local storage
    localStorage.removeItem("user");

    dispatch({ type: AUTH_LOGOUT, _id: null, token: null });

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "logout", "user");
  }
};
