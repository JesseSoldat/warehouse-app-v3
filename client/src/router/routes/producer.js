import React from "react";

import PrivateRoute from "../PrivateRoute";
// components
import Producers from "../../pages/producer/producers/Producers";
import Producer from "../../pages/producer/details/Producer";
import CreateProducer from "../../pages/producer/form/CreateProducer";
import EditProducer from "../../pages/producer/form/EditProducer";

const ProducerRoutes = [
  <PrivateRoute
    key="producers/search"
    path="/producers/search"
    component={Producers}
    exact
  />,
  <PrivateRoute
    key="producer-create"
    path="/producers/create"
    component={CreateProducer}
    exact
  />,
  <PrivateRoute
    key="producer-edit"
    path="/producers/edit/:producerId"
    component={EditProducer}
    exact
  />,
  <PrivateRoute
    key="producer"
    path="/producers/:producerId"
    component={Producer}
    exact
  />
];

export default ProducerRoutes;
