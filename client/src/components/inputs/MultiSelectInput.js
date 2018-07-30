import React from "react";
import Select from "react-select";

// options an array of objs with a label and value property
// selectedOptions  an array of selected objs with a label and value property
// label - the label to give this field
// cb - a call back to handle the onChange event

// IMPORTANT ----------------------------------------------------------------
//"react-select": "^2.0.0-beta.6" NEEDS this version
// npm install react-select@2.0.0-beta.6

const MultiSelectInput = ({ options, selectedOptions, label, cb }) => {
  return (
    <div className="form-group mt-3">
      <label htmlFor="exampleFormControlSelect2">
        <strong>{label}</strong>
      </label>
      <Select
        isMulti
        defaultValue={selectedOptions}
        options={options}
        onChange={cb}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
};

export default MultiSelectInput;
