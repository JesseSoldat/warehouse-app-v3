import React from "react";

const FilterTextInput = ({ value, valueErr, info, onChangeSearchValue }) => {
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
            type="text"
            className={valueErr ? "form-control is-invalid" : "form-control"}
            value={value}
            placeholder="Seach Text"
            onChange={onChangeSearchValue}
          />
          <div className="invalid-feedback pl-2">{valueErr}</div>
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

export default FilterTextInput;
