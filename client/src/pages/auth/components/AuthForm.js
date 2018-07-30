import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { parse } from "qs";

// common components
import TextInput from "../../../components/inputs/TextInput";
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
// helpers
import formIsValid from "../helpers/formIsValid";
// utils
import isEmail from "../../../utils/validation/isEmail";
// actions
import {
  startRegister,
  startLogin,
  startResendVerification
} from "../../../actions/auth";
import { changeRoute } from "../../../actions/router";
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
    const query = parse(this.props.location.search.substr(1));
    if (query.verify) {
      this.props.serverMsg({
        heading: "Server Info",
        details: "Your account has been verified. Please login!",
        color: "info"
      });
    }
    // An error occured while trying to verfiy email
    if (query.verifyErr) {
      this.props.serverMsg({
        heading: "Server Error",
        details:
          "An error occured while trying to verify your account. Try to resend the email verification!",
        color: "danger"
      });
    }
  }

  componentWillUnmount() {
    const { parent, serverMsg, changeRoute } = this.props;
    changeRoute(`/${parent}`);

    if (parent === "login") {
      serverMsg(null);
    }
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
    this.refs.submitBtn.setAttribute("disabled", "disabled");
    const { isValid, errObj } = formIsValid(this.state, this.props.parent);

    if (!isValid) {
      this.refs.submitBtn.removeAttribute("disabled");
      this.setState(() => ({ ...errObj }));
      return;
    }

    switch (this.props.parent) {
      case "register":
        this.registerFlow();
        break;

      case "login":
        this.loginFlow();
        break;

      default:
        break;
    }
  };

  resendEmail = () => {
    this.props.startResendVerification(this.state.email);
  };

  render() {
    const { loading, msg, parent } = this.props;

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
            <button ref="submitBtn" className="btn btn-info btn-block mt-4">
              Submit
            </button>
          </form>
          <div className="row">
            <div className="col-12 mt-4">
              <div id="accordion">
                <div className="card">
                  <div className="card-header text-center" id="headingOne">
                    <h5 className="mb-0">
                      <button
                        className="btn btn-outline-dark btn-block"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Mangage Your Account
                      </button>
                    </h5>
                  </div>

                  <div
                    id="collapseOne"
                    className="collapse"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <small className="form-text text-muted mb-3">
                        * Fill in your email in the input shown above and click
                        either button to get started.
                      </small>
                      <button
                        className="btn btn-outline-dark btn-sm btn-block"
                        onClick={this.resendEmail}
                        disabled={isEmail(email) ? false : true}
                      >
                        Resend verification Email
                      </button>
                      <button
                        className="btn btn-outline-dark btn-sm btn-block"
                        disabled={isEmail(email) ? false : true}
                      >
                        Reset your Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // when a message from the server arrives let the user resubmit the form
    if (msg) {
      if (this.refs && "submitBtn" in this.refs) {
        this.refs.submitBtn.removeAttribute("disabled");
      }
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
  ui: ui,
  loading: ui.loading,
  msg: ui.msg
});

export default connect(
  mapStateToProps,
  { startRegister, startLogin, changeRoute, serverMsg, startResendVerification }
)(withRouter(AuthForm));
