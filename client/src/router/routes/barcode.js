import React from "react";

import PrivateRoute from "../PrivateRoute";
import BarcodeCreate from "../../pages/barcode/BarcodeCreate";
import BarcodeScan from "../../pages/barcode/BarcodeScan";

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
    component={BarcodeScan}
    exact
  />,
  // no location
  <PrivateRoute
    key="barcode/scan/box"
    path="/barcode/scan/:boxId"
    component={BarcodeScan}
    exact
  />,
  // have location
  <PrivateRoute
    key="barcode/scan/box/location"
    path="/barcode/scan/:storageId/:rackId/:shelfId/:shelfSpotId/:boxId"
    component={BarcodeScan}
    exact
  />
];

export default BarcodeRoutes;
