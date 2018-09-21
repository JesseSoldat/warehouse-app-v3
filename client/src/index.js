import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import firebase from "firebase";

// import registerServiceWorker from "./registerServiceWorker";

// css
import "./index.css";
// router
import AppRouter from "./router/AppRouter";
// store
import configureStore from "./store/configureStore";
// utils - auth
import handleInitialAuth from "./utils/auth/handleInitialAuth";

const config = {
  apiKey: "AIzaSyBkyPopLr6_O8iIPnEr--ZGcsW1ecxdr3s",
  authDomain: "file-upload-c3300.firebaseapp.com",
  databaseURL: "https://file-upload-c3300.firebaseio.com",
  projectId: "file-upload-c3300",
  storageBucket: "file-upload-c3300.appspot.com",
  messagingSenderId: "359118658227"
};
firebase.initializeApp(config);

const Loading = () => "";
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
