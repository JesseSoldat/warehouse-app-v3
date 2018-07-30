import React from "react";
import { Link } from "react-router-dom";

const TableTitle = ({ storageLabel = "", description = "", id = "" }) => {
  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
        <h2 className="pl-3">{storageLabel}</h2>

        <Link to={`/storages/${id}?type=storage`} className="pr-3">
          <button className="btn btn-default">
            <i className="fas fa-eye mr-2" />View Storage
          </button>
        </Link>
      </div>
      <p className="pl-3">{description}</p>
    </div>
  );
};

export default TableTitle;
