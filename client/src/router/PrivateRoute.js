import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import RouteListener from "../components/RouteListener";
import NavBar from "../components/NavBar";
import BreadCrumb from "../components/BreadCrumb";

const idTypesArray = [":customerId", ":producerId", ":productId", ":id"];

const PrivateRoute = ({ isAuth, component: Component, ...restOfProps }) => {
  return (
    <Route
      {...restOfProps}
      component={props =>
        isAuth ? (
          <div>
            <RouteListener />
            <NavBar />
            <BreadCrumb idTypesArray={idTypesArray} />
            <div className="my-3">
              <Component {...props} />
            </div>
            <div style={{ height: "80px" }} />
          </div>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const mapStateToProps = ({ auth }) => ({ isAuth: !!auth._id });

export default connect(mapStateToProps)(PrivateRoute);
