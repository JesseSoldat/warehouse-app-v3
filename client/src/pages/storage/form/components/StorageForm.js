import React, { Component } from "react";

// custom components
import FieldList from "./FieldList";
// helpers
import validateForm from "../helpers/validateForm";
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
    spotLabel: this.props.defaultState.spotLabel,
    spotLabelErr: "",
    boxLabel: this.props.defaultState.boxLabel,
    boxLabelErr: ""
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

    if (!isValid) {
      this.setState({ ...errsObj });
      return;
    }

    handleSubmit(form);
  };

  // events ---------------------------------------
  onChange = e => {
    const { name, value } = e.target;
    const err = `${name}Err`;
    this.setState({ [name]: value, [err]: null });
  };

  render() {
    const { formType, storageType } = this.props;

    return (
      <form
        className="col-xs-12 col-sm-10 col-md-8 mx-auto"
        onSubmit={this.onSubmit}
      >
        <FieldList
          state={this.state}
          storageType={storageType}
          formType={formType}
          onChange={this.onChange}
        />

        <input
          type="submit"
          value={capitalizeFirstLetter(formType)}
          className="btn btn-info btn-block mt-4"
        />
      </form>
    );
  }
}

export default StorageForm;
