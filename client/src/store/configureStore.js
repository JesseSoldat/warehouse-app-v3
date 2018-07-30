import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import adminReducer from "../reducers/admin";
import routerReducer from "../reducers/router";
import uiReducer from "../reducers/ui";
import authReducer from "../reducers/auth";
import productReducer from "../reducers/product";
import customerReducer from "../reducers/customer";
import producerReducer from "../reducers/producer";
import storageReducer from "../reducers/storage";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      admin: adminReducer,
      router: routerReducer,
      ui: uiReducer,
      auth: authReducer,
      product: productReducer,
      customer: customerReducer,
      producer: producerReducer,
      storage: storageReducer
    }),
    {},
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
