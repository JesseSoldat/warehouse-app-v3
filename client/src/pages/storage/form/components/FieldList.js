import React from "react";

// custom components
import Field from "./Field";
// helpers
import storageFieldData from "../helpers/storageFieldData";

const FieldList = ({ state, storageType: type, formType, onChange }) => {
  const formInputs = storageFieldData[type].map((field, i) => {
    if (field.showOnlyOnEdit && formType === "create") return null;

    return (
      <div
        className={i === 0 ? "form-group mt-5" : "form-group"}
        key={field.name}
      >
        <label>
          <small>{field.placeholder}</small>
        </label>

        {i === 0 && (
          <small className="d-block pb-3 float-right">
            <strong>* = required fields</strong>
          </small>
        )}

        <Field field={field} type={type} state={state} onChange={onChange} />
      </div>
    );
  });

  return formInputs;
};

export default FieldList;
