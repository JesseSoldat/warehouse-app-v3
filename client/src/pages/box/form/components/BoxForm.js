import React, { Component } from "react";

// common components
import Field from "../../../../components/inputs/Field";
// utils
import isEmpty from "../../../../utils/validation/isEmpty";

class BoxForm extends Component {
  state = {
    boxLabel: this.props.defaultState.boxLabel,
    boxLabelErr: ""
  };

  // cb --------------------------------------
  onSubmit = e => {
    e.preventDefault();
    const { boxLabel } = this.state;

    if (isEmpty(boxLabel))
      return this.setState({ boxLabelErr: "Box label is a required field!" });

    this.props.handleSubmit(boxLabel);
  };

  // events ---------------------------------------
  onChange = e => {
    const { value } = e.target;
    this.setState({ boxLabel: value, boxLabelErr: null });
  };

  render() {
    const { formType } = this.props;

    const fieldObj = {
      placeholder: "* Box Label",
      name: "boxLabel",
      err: "boxLabelErr",
      msg: "Box label is a required field!"
    };

    return (
      <form
        className="col-xs-12 col-sm-10 col-md-8 mx-auto"
        onSubmit={this.onSubmit}
      >
        <Field
          field={fieldObj}
          state={this.state}
          storageType="box"
          formType={formType}
          onChange={this.onChange}
        />

        <input
          type="submit"
          value={formType}
          className="btn btn-info btn-block mt-4"
        />
      </form>
    );
  }
}

export default BoxForm;
