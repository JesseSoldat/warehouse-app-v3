import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// common components
import TextInput from "../../../components/inputs/TextInput";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
// custom components
import ManageAccountAccordion from "./ManageAccountAccordion";
// helpers
import formIsValid from "../helpers/formIsValid";
import verifyMsg from "../helpers/verifyMsg";
// utils
import getUrlParameter from "../../../utils/getUrlParameter";
// actions
import {
  startRegister,
  startLogin,
  startResendVerification,
  requestResetPasswordEmail
} from "../../../actions/auth";
import { serverMsg, startShowOverlay } from "../../../actions/ui";

class AuthForm extends Component {
  // State ----------------------------------------------
  state = {
    username: "",
    usernameErr: null,
    email: "",
    emailErr: null,
    password: "",
    passwordErr: null,
    confirmPassword: "",
    confirmPasswordErr: null
  };

  // Lifecycles -----------------------------------------------
  componentDidMount() {
    this.handleVerify();
  }

  componentWillUnmount() {
    const { parent, serverMsg } = this.props;
    if (parent === "login") serverMsg(null, "loginClearMsg");
  }

  // Helper Functions -------------------------------
  createSeverMsg = msg => {
    this.props.serverMsg(msg);
  };

  handleVerify() {
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
  }

  // Events --------------------------------------------------
  onChange = e => {
    const { name, value } = e.target;
    const error = name + "Err"; // reset any errors on target input
    this.setState(() => ({ [name]: value, [error]: null }));
  };

  registerFlow = () => {
    const { username, email, password } = this.state;
    // Api Call
    this.props.startShowOverlay({ from: "registerShowOverlay" });
    this.props.startRegister({ username, email, password }, this.props.history);
  };

  loginFlow = () => {
    const { email, password } = this.state;
    // Api Call
    this.props.startShowOverlay({ from: "loginShowOverlay" });
    this.props.startLogin({ email, password });
  };

  onSubmit = e => {
    e.preventDefault();

    // Validation
    const { isValid, errObj } = formIsValid(this.state, this.props.parent);

    if (!isValid) return this.setState(() => ({ ...errObj }));

    // Flow Control
    this.props.parent === "register" ? this.registerFlow() : this.loginFlow();
  };

  resendEmail = () => {
    // Api Call
    this.props.startShowOverlay({ from: "resendVerificationShowOverlay" });
    this.props.startResendVerification(this.state.email);
  };

  resetPassword = email => {
    // Api Call
    this.props.startShowOverlay({ from: "passwordResetShowOverlay" });
    this.props.requestResetPasswordEmail(email);
  };

  // Render ---------------------------------------------
  render() {
    const { parent } = this.props;

    const {
      username,
      usernameErr,
      email,
      emailErr,
      password,
      passwordErr,
      confirmPassword,
      confirmPasswordErr
    } = this.state;

    return (
      <div>
        <Message />
        <Heading title={parent} />
        <div className="col-md-8 mx-auto">
          <form onSubmit={this.onSubmit} noValidate>
            {parent === "register" && (
              <TextInput
                label="Username"
                placeholder="Username"
                name="username"
                onChange={this.onChange}
                error={usernameErr}
                value={username}
              />
            )}
            <TextInput
              label="Email"
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.onChange}
              error={emailErr}
              value={email}
            />
            <TextInput
              label="Password"
              placeholder="Password"
              name="password"
              type="password"
              onChange={this.onChange}
              error={passwordErr}
              value={password}
            />
            {parent === "register" && (
              <TextInput
                label="Confirm Password"
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                onChange={this.onChange}
                error={confirmPasswordErr}
                value={confirmPassword}
              />
            )}
            <button className="btn btn-info btn-block mt-4">Submit</button>
          </form>

          <ManageAccountAccordion
            email={email}
            resendEmail={this.resendEmail}
            resetPassword={this.resetPassword}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui, auth }) => ({
  auth: auth,
  loading: ui.loading
});

export default connect(
  mapStateToProps,
  {
    startRegister,
    startLogin,
    serverMsg,
    startShowOverlay,
    startResendVerification,
    requestResetPasswordEmail
  }
)(withRouter(AuthForm));
