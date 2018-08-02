import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import io from "socket.io-client";

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

const socket = io("http://localhost:5000");

// socket.emit("client", "message from client");

socket.on("update", data => {
  const { msg, senderId } = data;
  const userId = "1313w57775434";
  if (senderId === userId) {
    return;
  }
  console.log("update", data);
});

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
