import React from "react";

import PublicRoute from "../PublicRoute";

import Auth from "../../pages/auth/Auth";
import ResetPassword from "../../pages/auth/ResetPassword";

const AuthRoutes = [
  <PublicRoute exact key="register" path="/register" component={Auth} />,
  <PublicRoute exact key="login" path="/login" component={Auth} />,
  <PublicRoute
    exact
    key="resetPassword"
    path="/resetPassword/:token"
    component={ResetPassword}
  />
];

export default AuthRoutes;
