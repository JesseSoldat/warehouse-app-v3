// actions & action helpers
import buildClientMsg from "../../actions/helpers/buildClientMsg";
import { AUTH_LOGIN } from "../../actions/auth";
import { NEW_MSG } from "../../actions/ui";
// utils
import setAxiosHeader from "../setAxiosHeader";
import isTokenExp from "./isTokenExp";

const handleInitialAuth = (store, renderApp) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    const { _id, token } = user;

    const { role, tokenIsExpired } = isTokenExp(token);

    if (tokenIsExpired) {
      localStorage.removeItem("user");

      setAxiosHeader(null);

      store.dispatch({
        type: NEW_MSG,
        msg: buildClientMsg({
          info: "Your session expired please login again.",
          color: "blue"
        }),
        loading: false
      });

      renderApp();
    } else {
      store.dispatch({
        type: AUTH_LOGIN,
        _id,
        token,
        role
      });

      setAxiosHeader(token);

      renderApp();
    }
  } else {
    setAxiosHeader(null);

    renderApp();
  }
};

export default handleInitialAuth;
