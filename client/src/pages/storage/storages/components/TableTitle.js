import React from "react";
import { Link } from "react-router-dom";
// common components
import IconBtn from "../../../../components/buttons/IconBtn";

const TableTitle = ({
  storageLabel = "",
  description = "",
  storageId,
  type = null
}) => {
  const renderBtn = type ? (
    <div>
      <Link to={`/barcode/create/${storageId}?type=storage`}>
        <IconBtn
          btnClass="btn-default m-1 mr-2"
          iconClass="fa-barcode mr-1"
          text="Create Barcode"
        />
      </Link>
      <Link to={`/storage/edit/${storageId}?type=storage`} className="mr-3">
        <IconBtn
          btnClass="btn-default m-1"
          iconClass="fa-edit mr-1"
          text="Edit Storage"
        />
      </Link>
    </div>
  ) : (
    <Link to={`/storage/${storageId}`} className="pr-3">
      <IconBtn
        btnClass="btn-default"
        iconClass="fa-eye mr-1"
        text="View Storage"
      />
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
