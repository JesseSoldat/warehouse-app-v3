import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// common components
import TextInput from "../../../components/inputs/TextInput";
import Message from "../../../components/Message";
// helpers
import formIsValid from "../helpers/formIsValid";
// utils
import getUrlParameter from "../../../utils/getUrlParameter";

class ResetPassForm extends Component {
  state = {
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
      this.setState(() => ({ ...errObj }));
      return;
    }
  };

  render() {
    return (
      <div className="col-md-8 mx-auto">
        <form onSubmit={this.onSubmit} noValidate>
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

          <button className="btn btn-info btn-block mt-4">Submit</button>
        </form>
      </div>
    );
  }
}

export default ResetPassForm;
