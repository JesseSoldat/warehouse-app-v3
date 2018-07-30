import React from "react";

// this is used for a placeholder
const BlankInput = ({ placeholder = "", valueErr = "", info = "" }) => {
  return (
    <div className="col-xs-12 col-md-5 d-inline-block py-2 my-0">
      <span>
        <label className="p-0 m-0">
          <small />
        </label>
        <div className="input-group">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="productInput">
              Text
            </label>
          </div>
          <input
            disabled
            type="text"
            className="form-control"
            placeholder={placeholder}
          />
          <div className="invalid-feedback pl-2" />
        </div>
        <div>
          {!valueErr && (
            <small className="form-text text-muted py-0 my-0 pl-2 pt-1 ">
              {info}
            </small>
          )}
        </div>
      </span>
    </div>
  );
};

export default BlankInput;
