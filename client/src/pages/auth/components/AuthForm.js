import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import TextInput from "../../../components/inputs/TextInput";
// custom components
import ManageAccountAccordion from "./ManageAccountAccordion";
// helpers
import formIsValid from "../helpers/formIsValid";

// actions
import {
  startResendVerification,
  requestResetPasswordEmail
} from "../../../actions/auth";
import { showOverlay } from "../../../actions/ui";

class AuthForm extends Component {
  // State ------------------------------------------
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

  // Helper Functions -----------------------------------
  handleAuthFlow = parent => {
    const { username, email, password } = this.state;

    if (parent === "register") {
      return this.props.handleRegister(username, email, password);
    }
    this.props.handleLogin(email, password);
  };

  // Events and Cbs ------------------------------------
  onChange = e => {
    const { name, value } = e.target;
    const error = name + "Err"; // reset any errors on target input
    this.setState(() => ({ [name]: value, [error]: null }));
  };

  onSubmit = e => {
    e.preventDefault();
    const { parent } = this.props;

    // Validation
    const { isValid, errObj } = formIsValid(this.state, parent);

    if (!isValid) return this.setState(() => ({ ...errObj }));

    this.handleAuthFlow(parent);
  };

  resendEmail = () => {
    // Api Call
    this.props.showOverlay({ from: "resendVerificationShowOverlay" });
    this.props.startResendVerification(this.state.email);
  };

  resetPassword = email => {
    // Api Call
    this.props.showOverlay({ from: "passwordResetShowOverlay" });
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

export default connect(
  null,
  {
    startResendVerification,
    requestResetPasswordEmail,
    showOverlay
  }
)(AuthForm);
