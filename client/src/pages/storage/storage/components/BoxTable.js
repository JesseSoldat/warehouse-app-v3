import React from "react";
import { Link } from "react-router-dom";

const BoxTable = ({ box }) => {
  console.log("box", box);
  const { _id: boxId, boxLabel, storedItems = [] } = box;

  return (
    <div className="card card-body mb-3" key={`table-${boxLabel}`}>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <h2>Box {boxLabel}</h2>

        <div>
          <Link to={`/box/edit/${boxId}?type=box`}>
            <button className="btn btn-default m-1">
              <i className="fas fa-edit mr-2" /> Edit Box
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoxTable;
