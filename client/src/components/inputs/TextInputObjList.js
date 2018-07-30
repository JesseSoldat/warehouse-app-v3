import React from "react";

// common compenents
import TextInput from "./TextInput";

const ObjInputList = ({ inputFields, state, cb }) => {
  const renderObjects = (parentObj, i) => {
    const fields = parentObj.fields.map((obj, fieldIndex) => {
      return (
        <div className="form-group col-4 d-inline-block" key={fieldIndex}>
          <TextInput
            label={obj.placeholder}
            placeholder={obj.placeholder}
            name={obj.name}
            onChange={cb}
            error={state[obj.err]}
            value={state[obj.name]}
            type={obj.type ? obj.type : "string"}
            info={obj.info ? obj.info : null}
          />
        </div>
      );
    });

    return (
      <div className="form-group mt-3" key={i}>
        <label>
          <strong>{parentObj.parent}</strong>
        </label>
        <div className="row">
          <div className="col-12">{fields}</div>
        </div>
      </div>
    );
  };

  return <div>{inputFields.map((obj, i) => renderObjects(obj, i))}</div>;
};

export default ObjInputList;
