import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import NavBar from "../components/NavBar";
import BreadCrumb from "../components/BreadCrumb";

import Socket from "../components/Socket";

const PrivateRoute = ({ isAuth, component: Component, ...restOfProps }) => {
  return (
    <Route
      {...restOfProps}
      component={props =>
        isAuth ? (
          <div>
            <Socket />
            <NavBar />
            <BreadCrumb />

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
