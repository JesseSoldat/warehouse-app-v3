import React from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import AdminRoutes from "./admin/routes";
import AuthRoutes from "./auth/routes";
import GeneralRoutes from "./general/routes";
import ProductRoutes from "./product/routes";
import ProducerRoutes from "./producer/routes";
import CustomerRoutes from "./customer/routes";
import StorageRoutes from "./storage/routes";
// used to test concepts
import PlayGroundRoutes from "./playground/routes";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      {AdminRoutes}
      {AuthRoutes}
      {GeneralRoutes}
      {ProductRoutes}
      {ProducerRoutes}
      {CustomerRoutes}
      {StorageRoutes}
      {PlayGroundRoutes}
    </Switch>
  </Router>
);

export default AppRouter;
