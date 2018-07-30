import React, { Component } from "react";

// common components
import TextInputList from "../../../../components/inputs/TextInputList";
// helpers
import customerFieldData from "../helpers/customerFieldData";
// utils
import resetRequiredFieldsErr from "../../../../utils/validation/resetRequiredFieldsErr";
import validateRequiredFieldsOnSubmit from "../../../../utils/validation/validateRequiredFieldsOnSubmit";

class CustomerForm extends Component {
  state = {
    customerNameErr: "",
    customerName: this.props.data.customerName,
    customerContact: this.props.data.customerContact,
    customerAddress: this.props.data.customerAddress
  };

  // events ------------------------
  onSubmit = e => {
    e.preventDefault();
    this.refs.submitBtn.setAttribute("disabled", "disabled");

    // check if any of the required fields are empty
    const { isValid, errObj } = validateRequiredFieldsOnSubmit(
      customerFieldData,
      this.state
    );

    if (!isValid) {
      this.setState({ ...errObj });
      this.refs.submitBtn.removeAttribute("disabled");
      return;
    }

    // send form data to parent with CB
    this.props.handleSubmit({
      customerName: this.state.customerName,
      customerContact: this.state.customerContact,
      customerAddress: this.state.customerAddress
    });
  };

  onChange = e => {
    const { name, value } = e.target;
    // newErrorState will be null || obj with errors
    const newErrorState = resetRequiredFieldsErr(customerFieldData, {
      name,
      value
    });

    if (newErrorState) {
      this.setState({ [name]: value, ...newErrorState });
      return;
    }
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <TextInputList
          data={customerFieldData}
          state={this.state}
          cb={this.onChange}
        />
        <input
          ref="submitBtn"
          type="submit"
          value="Submit"
          className="btn btn-info btn-block mt-4"
        />
      </form>
    );
  }
}

export default CustomerForm;
