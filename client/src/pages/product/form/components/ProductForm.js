import React, { Component } from "react";

// common components
import SelectInput from "../../../../components/inputs/SelectInput";
import MultiSelectInput from "../../../../components/inputs/MultiSelectInput";
import DatePickerInput from "../../../../components/inputs/DatePickerInput";
import TextInputList from "../../../../components/inputs/TextInputList";
import TextInputObjList from "../../../../components/inputs/TextInputObjList";
// helpers
import formatClientSelectOptions from "../helpers/formatClientSelectOptions";
import formatFormValues from "../helpers/formatFormValues";
import productFieldData from "../helpers/productFieldData";
import objInputFields from "../helpers/objInputFields";
// utils
import resetRequiredFieldsErr from "../../../../utils/validation/resetRequiredFieldsErr";
import validateRequiredFieldsOnSubmit from "../../../../utils/validation/validateRequiredFieldsOnSubmit";

class ProductForm extends Component {
  state = {
    //errors----------------
    productNameErr: "",
    brandNameErr: "",
    //fields---------------
    brandName: this.props.productObj.brandName,
    productName: this.props.productObj.productName,
    pointOfBuy: this.props.productObj.pointOfBuy,
    //Date
    manufacturingDate: this.props.productObj.manufacturingDate,
    dateCheckbox: this.props.productObj.dateCheckbox,
    //Numbers
    price: this.props.productObj.price,
    amountOfPieces: this.props.productObj.amountOfPieces,
    quantity: this.props.productObj.quantity,
    weight: this.props.productObj.weight,
    //Array of Strings
    productMaterial: this.props.productObj.productMaterial,
    comments: this.props.productObj.comments,
    //Obj
    prodHeight: this.props.productObj.prodHeight,
    prodWidth: this.props.productObj.prodWidth,
    prodLength: this.props.productObj.prodLength,
    packHeight: this.props.productObj.packHeight,
    packWidth: this.props.productObj.packWidth,
    packLength: this.props.productObj.packLength,
    //Ref
    selectedProducer: this.props.selectedProducer,
    selectedCustomers: this.props.selectedCustomers
      ? this.props.selectedCustomers
      : []
  };

  // Events --------------------------------
  onSubmit = e => {
    const { handleSendMsg, handleSubmit } = this.props;
    e.preventDefault();
    // don't allow the user to submit more than once
    this.refs.submitBtn.setAttribute("disabled", "disabled");
    // clear any messages from the server
    handleSendMsg(null);

    // check if any of the required fields are empty
    const { isValid, errObj } = validateRequiredFieldsOnSubmit(
      productFieldData,
      this.state
    );

    if (!isValid) {
      // allow user to submit form again
      this.refs.submitBtn.removeAttribute("disabled");
      this.setState(() => ({ ...errObj }));
      // TODO add smooth scrolling
      // scroll to the message since the form is long
      window.scrollTo(0, 0);
      return;
    }

    const formattedValues = formatFormValues(this.state);

    handleSubmit(formattedValues);
  };

  onChange = e => {
    const { name, value } = e.target;

    // newErrorState will be null || obj with errors
    const newErrorState = resetRequiredFieldsErr(productFieldData, {
      name,
      value
    });

    if (newErrorState) {
      return this.setState(() => ({ [name]: value, ...newErrorState }));
    }
    this.setState(() => ({ [name]: value }));
  };

  // Select
  onSelect = selectedOption => {
    const stateName = "selectedProducer";
    const value = selectedOption ? selectedOption : "";
    this.setState(() => ({ [stateName]: value }));
  };

  onMultiSelect = selectedOptions => {
    const stateName = "selectedCustomers"; // array of selected obj
    const value = selectedOptions ? selectedOptions : [];
    this.setState(() => ({ [stateName]: value }));
  };

  // Date
  handleDateChange = manufacturingDate => {
    this.setState({ manufacturingDate });
  };

  handleCheck = () => {
    this.setState({ dateCheckbox: !this.state.dateCheckbox });
  };

  render() {
    const { msg, producerOptions, customerOptions } = this.props;

    const {
      selectedProducer,
      selectedCustomers, // edit mode
      manufacturingDate,
      dateCheckbox
    } = this.state;

    // transform raw api data to work with react-select api
    const {
      producerSelectOptions,
      customerSelectOptions
    } = formatClientSelectOptions(producerOptions, customerOptions);

    // when a message from the server arrives let the user resubmit the form
    if (msg) {
      if (this.refs && "submitBtn" in this.refs) {
        this.refs.submitBtn.removeAttribute("disabled");
      }
    }

    return (
      <form onSubmit={this.onSubmit}>
        <TextInputList
          data={productFieldData}
          state={this.state}
          cb={this.onChange}
        />
        <DatePickerInput
          dateLabel="Manufacturing Date"
          checkLabel="Use this date"
          date={manufacturingDate}
          checked={dateCheckbox}
          handleDateChange={this.handleDateChange}
          handleCheck={this.handleCheck}
        />
        <SelectInput
          options={producerSelectOptions}
          label="Producer"
          name="producerName"
          cb={this.onSelect}
          selectedOption={selectedProducer}
        />

        <MultiSelectInput
          options={customerSelectOptions}
          selectedOptions={selectedCustomers}
          label="Customers"
          cb={this.onMultiSelect}
        />

        <TextInputObjList
          inputFields={objInputFields}
          state={this.state}
          cb={this.onChange}
        />

        <input
          type="submit"
          className="btn btn-info btn-block mt-4"
          value="Submit"
          ref="submitBtn"
        />
      </form>
    );
  }
}

export default ProductForm;
