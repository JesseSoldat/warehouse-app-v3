import axios from "axios";

// utils
import setAxiosHeader from "../utils/setAxiosHeader";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { showOverlay } from "./ui";
// types
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const startRegister = (user, history) => async dispatch => {
  try {
    const res = await axios.post("/api/register", user);

    const { msg, options } = res.data;

    checkForMsg(msg, dispatch, options, "authActionStartRegister");

    history.push("/login");
  } catch (err) {
    axiosResponseErrorHandling(
      err,
      dispatch,
      "register",
      "user",
      "authActionStartRegisterMsg"
    );
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

    checkForMsg(msg, dispatch, options, "authActionStartLogin");
  } catch (err) {
    axiosResponseErrorHandling(
      err,
      dispatch,
      "login",
      "user",
      "authActionStartLoginMsg"
    );
  }
};

export const startResendVerification = email => async dispatch => {
  dispatch(showOverlay());
  try {
    const res = await axios.post("/api/resendVerification", { email });
    const { msg, options } = res.data;

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "resend", "verification email");
  }
};

// RESET PASSWORD --------------------------------------------
// send reset email
export const requestResetPasswordEmail = email => async dispatch => {
  try {
    const res = await axios.get(`/api/resetPasswordEmail/${email}`);

    const { msg, options } = res.data;

    checkForMsg(msg, dispatch, options, "authActionRequestResetPasswordEmail");
  } catch (err) {
    axiosResponseErrorHandling(
      err,
      dispatch,
      "reset",
      "password",
      "authActionRequestResetPasswordEmailMsg"
    );
  }
};

// use token from email to reset password
export const startResetPassword = (passObj, history) => async dispatch => {
  dispatch(showOverlay());
  try {
    const res = await axios.patch("/api/resetPassword", passObj);

    const { msg, options } = res.data;

    checkForMsg(msg, dispatch, options);

    history.push("/login");
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "reset", "password");
  }
};

export const startLogout = () => async dispatch => {
  dispatch(showOverlay());
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
