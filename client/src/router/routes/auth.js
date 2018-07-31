import React from "react";

import PublicRoute from "../PublicRoute";
import Auth from "../../pages/auth/Auth";

const AuthRoutes = [
  <PublicRoute exact key="register" path="/register" component={Auth} />,
  <PublicRoute exact key="login" path="/login" component={Auth} />
];

export default AuthRoutes;
