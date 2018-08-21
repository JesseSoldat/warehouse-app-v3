import React from "react";

// custom components
import ResetPassForm from "./components/ResetPassForm";
// common components
import Heading from "../../components/Heading";
import Message from "../../components/Message";

const ResetPassword = () => {
  return (
    <div className="container my-3">
      <Message />
      <Heading title="Reset Password" />
      <ResetPassForm />
      <div style={{ height: "100px" }} />
    </div>
  );
};

export default ResetPassword;
