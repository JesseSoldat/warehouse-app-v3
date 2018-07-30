import React from "react";

// custom components
import TableTitle from "./TableTitle";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

const StoragesTable = ({
  storage: { _id = "", storageLabel = "", racks = [], description = "" }
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
          storageLabel={storageLabel}
          description={description}
          id={_id}
        />
        <div className="table-responsive-xs table-responsive-sm">
          <table className="table table-striped col-12">
            <TableHead maxShelves={maxShelves} id={_id} />
            <TableBody racks={racks} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoragesTable;
