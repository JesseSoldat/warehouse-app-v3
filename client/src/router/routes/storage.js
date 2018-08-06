import React from "react";

import PrivateRoute from "../PrivateRoute";

import Storages from "../../pages/storage/storages/Storages";
import Details from "../../pages/storage/storages/Details";
import Storage from "../../pages/storage/storage/Storage";
import StorageCreate from "../../pages/storage/form/StorageCreate";
import StorageEdit from "../../pages/storage/form/StorageEdit";
import StorageSearch from "../../pages/storage/search/StorageSearch";

const StorageRoutes = [
  // STORAGES -----------------------------
  <PrivateRoute
    key="/storages"
    path="/storages"
    component={Storages}
    exact={true}
  />,

  <PrivateRoute
    key="/storages/search"
    path="/storages/search"
    component={StorageSearch}
    exact={true}
  />,

  // CREATE -----UPDATE----------
  <PrivateRoute
    key="/storages/create/:id"
    path="/storages/create/:id"
    component={StorageCreate}
    exact={true}
  />,
  <PrivateRoute
    key="/storages/edit/:id"
    path="/storages/edit/:id"
    component={StorageEdit}
    exact={true}
  />,

  // DEPRECATE -----------------------------
  <PrivateRoute
    key="/storages/single/:id"
    path="/storages/single/:id"
    component={Details}
    exact={true}
  />,

  <PrivateRoute
    key="/storages/:id"
    path="/storages/:id"
    component={Storage}
    exact={true}
  />,
  // DEPRECATE -----------------------------

  // NEW
  <PrivateRoute
    key="/storage/:storageId"
    path="/storage/:storageId"
    component={Details}
    exact={true}
  />,
  <PrivateRoute
    key="/rack/:rackId"
    path="/rack/:rackId"
    component={Storage}
    exact={true}
  />,
  <PrivateRoute
    key="/shelf/:rackId/:shelfId"
    path="/shelf/:rackId/:shelfId"
    component={Storage}
    exact={true}
  />,
  <PrivateRoute
    key="/shelfSpot/:rackId/:shelfId/:shelfSpotId"
    path="/shelfSpot/:rackId/:shelfId/:shelfSpotId"
    component={Storage}
    exact={true}
  />,
  <PrivateRoute
    key="/box/:boxId"
    path="/box/:boxId"
    component={Storage}
    exact={true}
  />
];

export default StorageRoutes;
