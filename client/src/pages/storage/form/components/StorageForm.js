import React, { Component } from "react";

// custom components
import FieldList from "./FieldList";
// helpers
import validateForm from "../helpers/validateForm";
import storageFieldData from "../helpers/storageFieldData";
// utils
import capitalizeFirstLetter from "../../../../utils/stringManipulation/capitalizeFirstLetter";

class StorageForm extends Component {
  state = {
    storageLabel: this.props.defaultState.storageLabel,
    storageLabelErr: "",
    description: this.props.defaultState.description,
    descriptionErr: "",
    rackLabel: this.props.defaultState.rackLabel,
    rackLabelErr: "",
    shelfLabel: this.props.defaultState.shelfLabel,
    shelfLabelErr: "",
    shelfSpotLabel: this.props.defaultState.shelfSpotLabel,
    shelfSpotLabelErr: ""
  };

  // cb --------------------------------------
  onSubmit = e => {
    e.preventDefault();
    const { storageType, formType, handleSubmit } = this.props;

    const { isValid, errsObj, form } = validateForm(
      storageType,
      formType,
      this.state
    );

    if (!isValid) return this.setState({ ...errsObj });

    handleSubmit(form);
  };

  // events ---------------------------------------
  onChange = e => {
    const { name, value } = e.target;
    const err = `${name}Err`;
    this.setState({ [name]: value, [err]: null });
  };

  render() {
    return (
      <form
        className="col-xs-12 col-sm-10 col-md-8 mx-auto"
        onSubmit={this.onSubmit}
      >
        <FieldList
          storageFieldData={storageFieldData}
          state={this.state}
          storageType={this.props.storageType}
          onChange={this.onChange}
        />

        <input
          type="submit"
          value={capitalizeFirstLetter(this.props.formType)}
          className="btn btn-info btn-block mt-4"
        />
      </form>
    );
  }
}

export default StorageForm;
