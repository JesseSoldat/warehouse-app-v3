import React from "react";

import PrivateRoute from "../PrivateRoute";
import PlayGround from "../../pages/playground/PlayGround";

// used to test concepts
const PlayGroundRoutes = [
  <PrivateRoute
    key="playGround"
    path="/admin/playGround"
    component={PlayGround}
    exact
  />
];

export default PlayGroundRoutes;
