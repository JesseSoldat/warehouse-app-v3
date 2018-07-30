// actions & action helpers
import buildClientMsg from "../../actions/helpers/buildClientMsg";
import { AUTH_LOGIN } from "../../actions/auth";
import { NEW_MSG } from "../../actions/ui";
// utils
import setAxiosHeader from "../setAxiosHeader";
import isTokenExp from "./isTokenExp";
// import deleteExpToken from "./deleteExpToken";

const handleInitialAuth = (store, renderApp) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    const { _id, token } = user;

    // console.log(user);

    if (isTokenExp(token)) {
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

      // deleteExpToken(token);

      renderApp();
    } else {
      store.dispatch({
        type: AUTH_LOGIN,
        _id,
        token
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
