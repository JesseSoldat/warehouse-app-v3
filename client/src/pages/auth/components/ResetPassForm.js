import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// common components
import TextInput from "../../../components/inputs/TextInput";
// helpers
import formIsValid from "../helpers/formIsValid";
// actions
import { startShowOverlay } from "../../../actions/ui";
import { startResetPasswordWithToken } from "../../../actions/auth";

class ResetPassForm extends Component {
  state = {
    email: "",
    emailErr: null,
    password: "",
    passwordErr: null,
    confirmPassword: "",
    confirmPasswordErr: null
  };

  onChange = e => {
    const { name, value } = e.target;
    const error = name + "Err"; // reset any errors on target input
    this.setState(() => ({ [name]: value, [error]: null }));
  };

  onSubmit = e => {
    e.preventDefault();
    const { isValid, errObj } = formIsValid(this.state, "resetPassword");

    if (!isValid) {
      return this.setState(() => ({ ...errObj }));
    }

    this.resetPasswordWithToken();
  };

  resetPasswordWithToken() {
    const { token } = this.props.match.params;
    const { email, password } = this.state;

    this.props.startShowOverlay({ from: "passwordResetWithTokenShowOverlay" });

    this.props.startResetPasswordWithToken(
      { email, password, token },
      this.props.history
    );
  }

  render() {
    return (
      <div className="col-md-8 mx-auto">
        <form onSubmit={this.onSubmit} noValidate>
          <TextInput
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            onChange={this.onChange}
            error={this.state.emailErr}
            value={this.state.email}
          />
          <TextInput
            label="New Password"
            placeholder="New Password"
            name="password"
            type="password"
            onChange={this.onChange}
            error={this.state.passwordErr}
            value={this.state.password}
          />

          <TextInput
            label="Confirm Password"
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={this.onChange}
            error={this.state.confirmPasswordErr}
            value={this.state.confirmPassword}
          />

          <button type="submit" className="btn btn-info btn-block mt-4">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { startShowOverlay, startResetPasswordWithToken }
)(withRouter(ResetPassForm));
