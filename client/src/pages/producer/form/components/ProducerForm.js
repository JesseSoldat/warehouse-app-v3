import React, { Component } from "react";

// common components
import TextInputList from "../../../../components/inputs/TextInputList";
// helpers
import producerFieldData from "../helpers/producerFieldData";
// utils
import resetRequiredFieldsErr from "../../../../utils/validation/resetRequiredFieldsErr";
import validateRequiredFieldsOnSubmit from "../../../../utils/validation/validateRequiredFieldsOnSubmit";

class ProducerForm extends Component {
  state = {
    producerNameErr: "",
    producerName: this.props.data.producerName,
    producerContact: this.props.data.producerContact,
    producerAddress: this.props.data.producerAddress
  };

  // events ------------------------------------------
  onSubmit = e => {
    e.preventDefault();
    this.refs.submitBtn.setAttribute("disabled", "disabled");

    // check if any of the required fields are empty
    const { isValid, errObj } = validateRequiredFieldsOnSubmit(
      producerFieldData,
      this.state
    );

    if (!isValid) {
      this.setState({ ...errObj });
      this.refs.submitBtn.removeAttribute("disabled");
      return;
    }

    // send form data to parent with CB
    this.props.handleSubmit({
      producerName: this.state.producerName,
      producerContact: this.state.producerContact,
      producerAddress: this.state.producerAddress
    });
  };

  onChange = e => {
    const { name, value } = e.target;

    // newErrorState will be null || obj with errors
    const newErrorState = resetRequiredFieldsErr(producerFieldData, {
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
          data={producerFieldData}
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

export default ProducerForm;
