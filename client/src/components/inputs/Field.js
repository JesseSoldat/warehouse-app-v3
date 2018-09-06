import React from "react";

// common components
import TextInput from "./TextInput";

const Field = ({ field, state, onChange }) => {
  return (
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
};

export default Field;
