import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";

// css
import "./index.css";
// router
import AppRouter from "./router/AppRouter";
// store
import configureStore from "./store/configureStore";
// utils - auth
import handleInitialAuth from "./utils/auth/handleInitialAuth";

const Loading = () => "loading..";
const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRenderedOnce = false;

const renderApp = () => {
  if (!hasRenderedOnce) {
    hasRenderedOnce = true;
    ReactDOM.render(jsx, document.getElementById("root"));
  }
};

ReactDOM.render(<Loading />, document.getElementById("root"));
registerServiceWorker();

handleInitialAuth(store, renderApp);
