import React from "react";

import PrivateRoute from "../PrivateRoute";

import Boxes from "../../pages/box/boxes/Boxes";
import Box from "../../pages/box/box/Box";
import BoxCreate from "../../pages/box/form/BoxCreate";
import BoxEdit from "../../pages/box/form/BoxEdit";

const BoxRoutes = [
  // Search -----------------------------------------------
  <PrivateRoute
    key="/boxes/search"
    path="/boxes/search"
    component={Boxes}
    exact={true}
  />,
  // Create Box -------------------------------------------
  // no location
  <PrivateRoute
    key="/box/create"
    path="/box/create"
    component={BoxCreate}
    exact={true}
  />,
  // have location MANUAL LINK we CREATE a box and LINK it
  <PrivateRoute
    key="/box/create/location"
    path="/box/create/:storageId/:rackId/:shelfId/:shelfSpotId"
    component={BoxCreate}
    exact={true}
  />,
  // Edit Box -------------------------------------------
  // no location
  <PrivateRoute
    key="/box/edit"
    path="/box/edit/:boxId"
    component={BoxEdit}
    exact={true}
  />,
  // have location
  <PrivateRoute
    key="/box/edit/location"
    path="/box/edit/:storageId/:rackId/:shelfId/:shelfSpotId/:boxId"
    component={BoxEdit}
    exact={true}
  />,
  // Single Box -----------------------------------------
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
