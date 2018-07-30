import React from "react";

import PrivateRoute from "../PrivateRoute";
// components
import Customers from "../../pages/customer/customers/Customers";
import Customer from "../../pages/customer/details/Customer";
import CreateCustomer from "../../pages/customer/form/CreateCustomer";
import EditCustomer from "../../pages/customer/form/EditCustomer";

const ProducerRoutes = [
  <PrivateRoute
    key="customers/search"
    path="/customers/search"
    component={Customers}
    exact
  />,
  <PrivateRoute
    key="customers-create"
    path="/customers/create"
    component={CreateCustomer}
    exact
  />,
  <PrivateRoute
    key="customers-edit"
    path="/customers/edit/:customerId"
    component={EditCustomer}
    exact
  />,
  <PrivateRoute
    key="customer"
    path="/customers/:customerId"
    component={Customer}
    exact
  />
];

export default ProducerRoutes;
