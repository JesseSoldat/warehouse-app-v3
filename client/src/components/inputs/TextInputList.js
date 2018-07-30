import React from "react";

// Components
import TextInput from "./TextInput";

const TextInputList = ({ data, state, cb }) => {
  return data.map((obj, i) => {
    const textInput = (
      <TextInput
        placeholder={obj.placeholder}
        name={obj.name}
        onChange={cb}
        error={state[obj.err]}
        value={state[obj.name]}
        type={obj.type ? obj.type : "string"}
        info={obj.info ? obj.info : null}
      />
    );

    return i === 0 ? (
      <div className="form-group mt-5" key={obj.name}>
        <label className="p-0 m-0">
          <small>{obj.placeholder}</small>
        </label>
        <small className="d-block pb-3 float-right">
          <strong>* = required fields</strong>
        </small>
        {textInput}
      </div>
    ) : (
      <div className="form-group" key={obj.name}>
        <label className="p-0 m-0">
          <small>{obj.placeholder}</small>
        </label>
        {textInput}
      </div>
    );
  });
};

export default TextInputList;
