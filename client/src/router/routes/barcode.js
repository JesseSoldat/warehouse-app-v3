import React from "react";

import PrivateRoute from "../PrivateRoute";
import BarcodeCreate from "../../pages/barcode/BarcodeCreate";

import LinkFromProduct from "../../pages/barcode/LinkFromProduct";
import LinkFromBox from "../../pages/barcode/LinkFromBox";
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

  // From Product ------------------------
  <PrivateRoute
    key="barcode/scan/product"
    path="/barcode/scan/product/:productId"
    component={LinkFromProduct}
    exact
  />,

  // From Box -----------------------------
  // no location from box
  <PrivateRoute
    key="barcode/scan/box"
    path="/barcode/scan/box/:boxId"
    component={LinkFromBox}
    exact
  />,

  // have location from box
  <PrivateRoute
    key="barcode/scan/box/location"
    path="/barcode/scan/box/:storageId/:rackId/:shelfId/:shelfSpotId/:boxId"
    component={LinkFromBox}
    exact
  />
];

export default BarcodeRoutes;
