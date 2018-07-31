import React from "react";

import PrivateRoute from "../PrivateRoute";
import BarcodeCreate from "../../pages/barcode/BarcodeCreate";
import BarcodeScan from "../../pages/barcode/BarcodeScan";

const BarcodeRoutes = [
  <PrivateRoute
    key="barcode/create"
    path="/barcode/create"
    component={BarcodeCreate}
    exact
  />,
  <PrivateRoute
    key="barcode/scan"
    path="/barcode/scan"
    component={BarcodeScan}
    exact
  />
];

export default BarcodeRoutes;
