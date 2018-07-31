import React from "react";

import PrivateRoute from "../PrivateRoute";
import ManageUsers from "../../pages/admin/ManageUsers";

const AdminRoutes = [
  <PrivateRoute
    key="manageUsers"
    path="/admin/manageUsers"
    component={ManageUsers}
    exact
  />
];

export default AdminRoutes;
