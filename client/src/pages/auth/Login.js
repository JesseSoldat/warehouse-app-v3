import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// Common Components
import Message from "../../components/Message";
import Heading from "../../components/Heading";
// Custom Components
import AuthForm from "./components/AuthForm";
// helpers
import verifyMsg from "./helpers/verifyMsg";
// utils
import getUrlParameter from "../../utils/getUrlParameter";
// Actions
import { startLogin } from "../../actions/auth";
import { serverMsg, showOverlay } from "../../actions/ui";

class Login extends Component {
  // Lifecycles ------------------------------------
  componentDidMount() {
    this.handleVerify();
  }

  componentWillUnmount() {
    this.props.serverMsg(null, "loginClearMsg");
  }

  handleVerify = () => {
    // Success
    const verify = getUrlParameter("verify");
    if (verify) {
      this.props.serverMsg(verifyMsg["success"]);
    }
    // Error
    const verifyErr = getUrlParameter("verifyErr");
    if (verifyErr) {
      this.props.serverMsg(verifyMsg["error"]);
    }
  };

  // Events and Cbs ---------------------------
  handleLogin = (email, password) => {
    // Api Call
    this.props.showOverlay({ from: "loginShowOverlay" });
    this.props.startLogin({ email, password });
  };

  // Render -------------------------------------
  render() {
    return (
      <div className="container my-3">
        <Message />
        <Heading title="login" />
        <AuthForm parent="login" handleLogin={this.handleLogin} />
        <div style={{ height: "100px" }} />
      </div>
    );
  }
}

export default connect(
  null,
  {
    startLogin,
    serverMsg,
    showOverlay
  }
)(withRouter(Login));
