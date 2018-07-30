import React from "react";

const SearchInputs = ({
  searchOptions,
  selection,
  searchText,
  searchTextErr,
  onSelect,
  onInput,
  onSearch
}) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="input-group mb-3">
          <div className="col-12 input-group-prepend">
            <label className="input-group-text" htmlFor="storageType">
              Type
            </label>
            <select
              value={selection}
              className="custom-select"
              onChange={onSelect}
            >
              {Object.keys(searchOptions).map(field => (
                <option key={`option-${field}`} value={searchOptions[field]}>
                  {field}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="input-group mb-3">
          <div className="col-12 input-group-prepend">
            <label className="input-group-text" htmlFor="labelInput">
              Label
            </label>
            <input
              type="text"
              value={searchText}
              className={
                searchTextErr ? "form-control is-invalid" : "form-control"
              }
              placeholder="Search by item label"
              onChange={onInput}
            />
          </div>
          <div>
            <small style={{ color: "red" }} className="mt-1 pl-4">
              {searchTextErr}
            </small>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="col-12">
          <button className="btn btn-primary btn-block" onClick={onSearch}>
            <i className="fas fa-search mr-2" />Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchInputs;
