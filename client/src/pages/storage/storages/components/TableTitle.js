import React from "react";
import { Link } from "react-router-dom";

const TableTitle = ({
  storageLabel = "",
  description = "",
  storageId,
  type = null
}) => {
  const renderBtn = type ? (
    <div>
      <Link to={`/barcode/create/${storageId}?type=storage`}>
        <button className="btn btn-default m-1 mr-2">
          <i className="fas fa-barcode mr-2" /> Create Barcode
        </button>
      </Link>
      <Link to={`/storage/edit/${storageId}?type=storage`} className="mr-3">
        <button className="btn btn-default m-1">
          <i className="fas fa-edit mr-2" /> Edit Storage
        </button>
      </Link>
    </div>
  ) : (
    <Link to={`/storage/${storageId}`} className="pr-3">
      <button className="btn btn-default">
        <i className="fas fa-eye mr-2" />
        View Storage
      </button>
    </Link>
  );

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
        <h2 className="pl-3">{storageLabel}</h2>
        {renderBtn}
      </div>
      <p className="pl-3">{description}</p>
    </div>
  );
};

export default TableTitle;
