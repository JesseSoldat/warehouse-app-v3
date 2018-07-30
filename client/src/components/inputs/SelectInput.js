import React from "react";
import Select from "react-select";

// options an array of objs with a label and value property
// selectedOption - the options that is selected in component level state
// label - the label to give this field
// cb - a call back to handle the onChange evetn

const SelectInput = ({ options, selectedOption, label, cb }) => {
  const selectElement = (
    <div className="form-group mt-3">
      <label>
        <strong>{label}</strong>
      </label>
      <Select value={selectedOption} onChange={cb} options={options} />
    </div>
  );

  return selectElement;
};

export default SelectInput;
