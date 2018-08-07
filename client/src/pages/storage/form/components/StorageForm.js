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
    shelfSpotLabel: this.props.defaultState.shelfSpotLabel,
    shelfSpotLabelErr: "",
    boxLabel: this.props.defaultState.boxLabel,
    boxLabelErr: "",
    disableBtn: false
  };

  // lifecycles -----------------------------
  componentWillUpdate(nextProps, state) {
    const { msg } = nextProps;

    // If an error comes back from the server enable button
    if (msg && msg.color === "danger") {
      if (state.disableBtn === true) {
        this.setState({ disableBtn: false });
      }
    }
  }

  // cb --------------------------------------
  onSubmit = e => {
    e.preventDefault();
    this.setState({ disableBtn: true });
    const { storageType, formType, handleSubmit } = this.props;

    const { isValid, errsObj, form } = validateForm(
      storageType,
      formType,
      this.state
    );

    if (!isValid) {
      this.setState({ ...errsObj, disableBtn: false });
      return;
    }

    handleSubmit(form);
  };

  // events ---------------------------------------
  onChange = e => {
    const { name, value } = e.target;
    const err = `${name}Err`;
    this.setState({ [name]: value, [err]: null, disableBtn: false });
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
          disabled={this.state.disableBtn}
          value={capitalizeFirstLetter(formType)}
          className="btn btn-info btn-block mt-4"
        />
      </form>
    );
  }
}

export default StorageForm;
