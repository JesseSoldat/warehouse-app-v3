import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import NavBar from "../components/NavBar";
import BreadCrumb from "../components/BreadCrumb";
import BreadCrumb2 from "../components/BreadCrumb2";

import Socket from "../components/Socket";

const idTypesArray = [":customerId", ":producerId", ":productId", ":id"];

const PrivateRoute = ({ isAuth, component: Component, ...restOfProps }) => {
  return (
    <Route
      {...restOfProps}
      component={props =>
        isAuth ? (
          <div>
            <Socket />
            <NavBar />
            {/* <BreadCrumb idTypesArray={idTypesArray} /> */}
            <BreadCrumb2 />

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
