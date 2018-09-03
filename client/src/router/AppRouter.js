import React from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import AdminRoutes from "./routes/admin";
import AuthRoutes from "./routes/auth";
import BarcodeRoutes from "./routes/barcode";
import GeneralRoutes from "./routes/general";
import ProductRoutes from "./routes/product";
import ProducerRoutes from "./routes/producer";
import CustomerRoutes from "./routes/customer";
import StorageRoutes from "./routes/storage";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      {AdminRoutes}
      {AuthRoutes}
      {BarcodeRoutes}
      {GeneralRoutes}
      {ProductRoutes}
      {ProducerRoutes}
      {CustomerRoutes}
      {StorageRoutes}
    </Switch>
  </Router>
);

export default AppRouter;
