import React from "react";

// common components
import IconBtn from "../buttons/IconBtn";

const BtnGroup = ({ onSearch, onResetFilter }) => {
  return (
    <div className="d-flex flex-wrap mx-auto pt-3 pt-md-0">
      <span>
        <label className="mt-3">
          <small />
        </label>
        <IconBtn
          btnClass="btn-primary mr-1"
          iconClass="fa-search mr-1"
          text="Search"
          cb={onSearch}
        />

        <IconBtn
          btnClass="btn-danger"
          iconClass="fa-sync-alt mr-1"
          text="Reset Filter"
          cb={onResetFilter}
        />
      </span>
    </div>
  );
};

export default BtnGroup;
