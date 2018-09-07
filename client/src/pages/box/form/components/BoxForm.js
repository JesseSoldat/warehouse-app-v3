import React, { Component } from "react";

// common components
import TextInput from "../../../../components/inputs/TextInput";
// utils
import isEmpty from "../../../../utils/validation/isEmpty";

class BoxForm extends Component {
  state = {
    boxLabel: this.props.boxLabel,
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
  onChange = e =>
    this.setState({ boxLabel: e.target.value, boxLabelErr: null });

  render() {
    const { formType } = this.props;

    return (
      <form
        className="col-xs-12 col-sm-10 col-md-8 mx-auto"
        onSubmit={this.onSubmit}
      >
        <TextInput
          name="boxLabel"
          placeholder="* Box Label"
          value={this.state.boxLabel}
          label="* Box Label"
          error={this.state.boxLabelErr}
          onChange={this.onChange}
          disabled={false}
          required={true}
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
