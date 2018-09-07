import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import NavBar from "../components/NavBar";
import BreadCrumb from "../components/breadcrumb/BreadCrumb";
import OverlaySpinner from "../components/OverlaySpinner";
import Socket from "../components/Socket";
import RouteChanged from "../components/RouteChanged";

const PrivateRoute = ({ isAuth, component: Component, ...restOfProps }) => {
  return (
    <Route
      {...restOfProps}
      component={props =>
        isAuth ? (
          <div>
            <RouteChanged />
            <Socket />
            <NavBar />
            <BreadCrumb />
            <OverlaySpinner />
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
