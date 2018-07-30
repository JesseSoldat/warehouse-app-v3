import React from "react";

const BtnGroup = ({ onSearchProduct, onResetFilter }) => {
  return (
    <div className="d-flex flex-wrap mx-auto pt-3 pt-md-0">
      <span>
        <label className="mt-3">
          <small />
        </label>
        <button
          onClick={onSearchProduct}
          className="btn btn-primary mr-1"
          type="button"
        >
          <i className="fas fa-search mr-2 " />
          Search
        </button>
        <button
          onClick={onResetFilter}
          className="btn btn-danger"
          type="button"
        >
          <i className="fas fa-sync-alt mr-2 " />
          Reset Filter
        </button>
      </span>
    </div>
  );
};

export default BtnGroup;
