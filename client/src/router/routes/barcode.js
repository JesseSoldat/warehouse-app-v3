import React from "react";

import PrivateRoute from "../PrivateRoute";
import BarcodeCreate from "../../pages/barcode/BarcodeCreate";
import LinkItems from "../../pages/barcode/LinkItems";

const BarcodeRoutes = [
  // Create -----------------------------
  <PrivateRoute
    key="barcode/create"
    path="/barcode/create"
    component={BarcodeCreate}
    exact
  />,
  // Scan -----------------------------
  <PrivateRoute
    key="barcode/scan"
    path="/barcode/scan"
    component={LinkItems}
    exact
  />,
  // no location from box
  <PrivateRoute
    key="barcode/scan/box"
    path="/barcode/scan/box/:boxId"
    component={LinkItems}
    exact
  />,
  // no location from product
  <PrivateRoute
    key="barcode/scan/product"
    path="/barcode/scan/product/:productId"
    component={LinkItems}
    exact
  />,
  // have location from box
  <PrivateRoute
    key="barcode/scan/box/location"
    path="/barcode/scan/box/:storageId/:rackId/:shelfId/:shelfSpotId/:boxId"
    component={LinkItems}
    exact
  />
];

export default BarcodeRoutes;
