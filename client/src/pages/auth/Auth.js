import React from "react";

import AuthForm from "./components/AuthForm";

const Auth = ({ location }) => {
  const path = location.pathname.split("/")[1];
  return (
    <div className="container my-3">
      <AuthForm parent={path} />
      <div style={{ height: "100px" }} />
    </div>
  );
};

export default Auth;
