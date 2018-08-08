import React from "react";

import PrivateRoute from "../PrivateRoute";

import Storages from "../../pages/storage/storages/Storages";
import Details from "../../pages/storage/storages/Details";
import Storage from "../../pages/storage/storage/Storage";
import Box from "../../pages/storage/Box/Box";
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

  // CREATE ------------------
  <PrivateRoute
    key="/storage/create"
    path="/storage/create"
    component={StorageCreate}
    exact={true}
  />,
  <PrivateRoute
    key="/rack/create"
    path="/rack/create/:storageId"
    component={StorageCreate}
    exact={true}
  />,
  <PrivateRoute
    key="/shelf/create"
    path="/shelf/create/:storageId/:rackId"
    component={StorageCreate}
    exact={true}
  />,
  <PrivateRoute
    key="/shelfSpot/create"
    path="/shelfSpot/create/:storageId/:rackId/:shelfId"
    component={StorageCreate}
    exact={true}
  />,
  <PrivateRoute
    key="/box/create"
    path="/box/create"
    component={StorageCreate}
    exact={true}
  />,

  // EDIT ---------------------
  <PrivateRoute
    key="/storage/edit"
    path="/storage/edit/:storageId"
    component={StorageEdit}
    exact={true}
  />,
  <PrivateRoute
    key="/rack/edit"
    path="/rack/edit/:storageId/:rackId"
    component={StorageEdit}
    exact={true}
  />,
  <PrivateRoute
    key="/shelf/edit"
    path="/shelf/edit/:storageId/:rackId/:shelfId"
    component={StorageEdit}
    exact={true}
  />,
  <PrivateRoute
    key="/shelfSpot/edit"
    path="/shelfSpot/edit/:storageId/:rackId/:shelfId/:shelfSpotId"
    component={StorageEdit}
    exact={true}
  />,
  // no location
  <PrivateRoute
    key="/box/edit"
    path="/box/edit/:boxId"
    component={StorageEdit}
    exact={true}
  />,
  // have location
  <PrivateRoute
    key="/box/edit/location"
    path="/box/edit/:storageId/:rackId/:shelfId/:shelfSpotId/:boxId"
    component={StorageEdit}
    exact={true}
  />,

  // DETAILS ----------------------
  <PrivateRoute
    key="storage"
    path="/storage/:storageId"
    component={Details}
    exact={true}
  />,
  <PrivateRoute
    key="rack"
    path="/rack/:storageId/:rackId"
    component={Storage}
    exact={true}
  />,
  <PrivateRoute
    key="shelf"
    path="/shelf/:storageId/:rackId/:shelfId"
    component={Storage}
    exact={true}
  />,
  <PrivateRoute
    key="shelfSpot"
    path="/shelfSpot/:storageId/:rackId/:shelfId/:shelfSpotId"
    component={Storage}
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

export default StorageRoutes;
