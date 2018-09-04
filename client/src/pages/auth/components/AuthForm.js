import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// common components
import TextInput from "../../../components/inputs/TextInput";
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
// custom components
import ManageAccountAccordion from "./ManageAccountAccordion";
// helpers
import formIsValid from "../helpers/formIsValid";
// utils
import getUrlParameter from "../../../utils/getUrlParameter";
// actions
import {
  startRegister,
  startLogin,
  startResendVerification,
  requestResetPasswordEmail
} from "../../../actions/auth";
import { serverMsg } from "../../../actions/ui";

class AuthForm extends Component {
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

  componentDidMount() {
    // When a user verifies their email show a message
    const verify = getUrlParameter("verify");
    if (verify) {
      this.props.serverMsg({
        heading: "Server Info",
        details: "Your account has been verified. Please login!",
        color: "info"
      });
    }
    // An error occured while trying to verfiy email
    const verifyErr = getUrlParameter("verifyErr");
    if (verifyErr) {
      this.props.serverMsg({
        heading: "Server Error",
        details:
          "An error occured while trying to verify your account. Try to resend the email verification!",
        color: "danger"
      });
    }
  }

  componentWillUnmount() {
    const { parent, serverMsg } = this.props;
    if (parent === "login") serverMsg(null);
  }

  onChange = e => {
    const { name, value } = e.target;
    const error = name + "Err"; // reset any errors on target input
    this.setState(() => ({ [name]: value, [error]: null }));
  };

  registerFlow = () => {
    const { username, email, password } = this.state;
    this.props.startRegister({ username, email, password }, this.props.history);
  };

  loginFlow = () => {
    const { email, password } = this.state;
    this.props.startLogin({ email, password });
  };

  onSubmit = e => {
    e.preventDefault();
    const { isValid, errObj } = formIsValid(this.state, this.props.parent);

    if (!isValid) {
      this.setState(() => ({ ...errObj }));
      return;
    }

    this.props.parent === "register" ? this.registerFlow() : this.loginFlow();
  };

  resendEmail = () => this.props.startResendVerification(this.state.email);

  resetPassword = email => this.props.requestResetPasswordEmail(email);

  render() {
    const { loading, parent } = this.props;

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

    let content;

    if (loading) {
      content = <Spinner />;
    } else {
      content = (
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
      );
    }

    return (
      <div>
        <Message />
        <Heading title={parent} />
        {content}
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
    startResendVerification,
    requestResetPasswordEmail
  }
)(withRouter(AuthForm));
