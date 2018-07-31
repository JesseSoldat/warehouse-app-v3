import React from "react";

import PrivateRoute from "../PrivateRoute";

import Storages from "../../pages/storage/storages/Storages";
import Storage from "../../pages/storage/storage/Storage";
import StorageCreate from "../../pages/storage/form/StorageCreate";
import StorageEdit from "../../pages/storage/form/StorageEdit";
import StorageSearch from "../../pages/storage/search/StorageSearch";

const StorageRoutes = [
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
  <PrivateRoute
    key="/storages/:id"
    path="/storages/:id"
    component={Storage}
    exact={true}
  />
];

export default StorageRoutes;
