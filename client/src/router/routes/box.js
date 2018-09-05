import React from "react";

import PrivateRoute from "../PrivateRoute";

import Boxes from "../../pages/storage/boxes/Boxes";
import Box from "../../pages/storage/box/Box";

const BoxRoutes = [
  <PrivateRoute
    key="/boxes/search"
    path="/boxes/search"
    component={Boxes}
    exact={true}
  />,
  // NO LOCATION
  <PrivateRoute
    key="/box/:boxId"
    path="/box/:boxId"
    component={Box}
    exact={true}
  />,
  // HAVE LOCATION
  <PrivateRoute
    key="/box/location/:boxId"
    path="/box/:storageId/:rackId/:shelfId/:shelfSpotId/:boxId"
    component={Box}
    exact={true}
  />
];

export default BoxRoutes;
