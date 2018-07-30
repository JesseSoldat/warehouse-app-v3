import React from "react";

// common components
import TextInput from "../../../../components/inputs/TextInput";

const Field = ({ field, state, type, onChange }) => {
  let fieldGroup;

  switch (field.type) {
    default:
      fieldGroup = (
        <TextInput
          key={field.placeholder}
          placeholder={field.placeholder}
          name={field.name}
          onChange={onChange}
          error={state[`${field.name}Err`]}
          value={state[field.name]}
          type={field.type || "string"}
          info={field.info || null}
        />
      );
      break;
  }
  return fieldGroup;
};

export default Field;
