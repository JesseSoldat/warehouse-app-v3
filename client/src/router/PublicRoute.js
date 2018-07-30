import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import NavBar from "../components/NavBar";

const PublicRoute = ({
  isAuth,
  auth,
  component: Component,
  ...restOfProps
}) => {
  return (
    <Route
      {...restOfProps}
      component={props =>
        isAuth ? (
          <Redirect to="/dashboard" />
        ) : (
          <div>
            <NavBar />
            <Component {...props} />
          </div>
        )
      }
    />
  );
};

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth._id
});

export default connect(mapStateToProps)(PublicRoute);
