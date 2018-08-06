import React from "react";

// custom components
import TableTitle from "./TableTitle";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
// utils
import capitalizeEachWordOfString from "../../../../utils/stringManipulation/capitalizeEachWordOfString";

const StoragesTable = ({
  storage: { storageLabel = "", racks = [], description = "" },
  storageId,
  type = null
}) => {
  let maxShelves = 0;

  // Figure out how many columns the table needs
  for (let rack of racks) {
    const length = rack.shelves.length;
    maxShelves = length > maxShelves ? length : maxShelves;
  }

  return (
    <div className="col-12 d-flex justify-content-around flex-wrap mt-4">
      <div className="card card-body mb-3">
        <TableTitle
          storageLabel={capitalizeEachWordOfString(storageLabel)}
          description={description}
          storageId={storageId}
          type={type}
        />
        <div className="table-responsive-xs table-responsive-sm">
          <table className="table table-striped col-12">
            <TableHead maxShelves={maxShelves} storageId={storageId} />
            <TableBody racks={racks} storageId={storageId} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoragesTable;
