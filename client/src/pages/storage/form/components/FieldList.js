import React from "react";

// common components
import TextInput from "../../../../components/inputs/TextInput";

const FieldList = ({
  storageFieldData,
  state,
  storageType: type,
  onChange
}) => {
  const formInputs = storageFieldData[type].map((field, i) => (
    <div
      className={i === 0 ? "form-group mt-5" : "form-group"}
      key={field.name}
    >
      <TextInput
        name={field.name}
        placeholder={field.placeholder}
        value={state[field.name]}
        type={field.type || "string"}
        label={field.placeholder}
        error={state[`${field.name}Err`]}
        onChange={onChange}
        required={field.required}
      />
    </div>
  ));

  return formInputs;
};

export default FieldList;
