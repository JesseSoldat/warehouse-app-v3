import React from "react";

// helpers
import searchBarFields from "../../helpers/searchBarFields";

const SelectInput = ({ searchOption, info, onChangeSearchOption }) => {
  const options = searchBarFields.map(field => (
    <option key={field.value} value={field.value}>
      {field.name}
    </option>
  ));

  return (
    <div className="col-xs-12 col-md-4 d-inline-block py-2 my-0">
      <span>
        <label className="p-0 m-0">
          <small />
        </label>
        <div className="input-group">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="productSelect">
              Options
            </label>
          </div>
          <select
            className="custom-select"
            id="productSelect"
            value={searchOption}
            style={{ height: "37.61px" }}
            onChange={onChangeSearchOption}
          >
            {options}
          </select>
        </div>
        <div>
          <small className="form-text text-muted py-0 my-0 pl-2 pt-1 ">
            {info}
          </small>
        </div>
      </span>
    </div>
  );
};

export default SelectInput;
