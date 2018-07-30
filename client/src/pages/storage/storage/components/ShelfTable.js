import React from "react";
import { Link } from "react-router-dom";

// helpers
import isEmpty from "../../../../utils/validation/isEmpty";

const ShelfTable = ({ storage, storageType, rack }) => {
  const { _id, shelfLabel, shelfSpots = [] } = storage;

  // console.log("shelf");
  // console.log(storage);

  let max = 0;

  for (let spot of shelfSpots) {
    const length = spot["storedItems"].length;
    max = length > max ? length : max;
  }

  const getTableHead = () => (
    <thead>
      <tr>
        <th scope="col">
          <Link to={`/storages/create/${_id}?type=shelfSpot`}>
            <button className="btn btn-default">
              <i className="fas fa-plus-circle mr-2" /> New Shelf Spot
            </button>
          </Link>
        </th>
        {shelfSpots.length === 0 ? (
          <th>No Spots yet - create one</th>
        ) : (
          shelfSpots.map(({ _id: spotId = "", shelfSpotLabel = "" }, i) => (
            <th scope="row" key={`spot-head-${i}`}>
              <Link to={`/storages/${spotId}?type=shelfSpot`}>
                Spot {shelfSpotLabel}
              </Link>
            </th>
          ))
        )}
      </tr>
    </thead>
  );

  const getTableCell = (item, kind, spotIndex, itemIndex) => (
    <td key={`cellData-${spotIndex + itemIndex}`}>
      <Link
        to={`/${kind === "product" ? "products" : "storages"}/${item._id}${
          kind === "product" ? "" : "?type=box"
        }`}
      >
        {kind === "product" ? item.productName : `Box ${item.boxLabel}`}
      </Link>
    </td>
  );

  const getTableBody = () => {
    // No Spots
    if (shelfSpots.length === 0) {
      return (
        <tbody>
          <tr>
            <td>No Shelf Spots Yet!</td>
          </tr>
        </tbody>
      );
    }

    // Have Spots

    const bodyData = [];

    shelfSpots.forEach((spot, spotIndex) => {
      spot.storedItems.forEach(({ kind, item }, itemIndex) => {
        if (!item || !kind) return;

        // create an array
        if (!bodyData[itemIndex]) bodyData[itemIndex] = [];

        // push data to the current index of the loop
        bodyData[itemIndex].push(
          getTableCell(item, kind, spotIndex, itemIndex)
        );
      });
    });

    return (
      <tbody>
        {bodyData.map((rowData, i) => (
          <tr key={`rowData-${i}`}>
            {/* empty first cell as spots start at 2nd column */}
            <td />

            {rowData.map((cellData, i) => rowData[i])}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="card card-body mb-3">
      <div className="d-flex flex-wrap justify-content-between mb-3">
        <h2>Shelf {shelfLabel}</h2>

        <div>
          <Link to={`/storages/edit/${_id}?type=shelf`}>
            <button className="btn btn-default m-1">
              <i className="fas fa-edit mr-2" /> Edit Shelf
            </button>
          </Link>

          {!isEmpty(rack) && (
            <Link to={`/storages/${rack._id}?type=rack`}>
              <button className="btn btn-default m-1">
                <i className="fas fa-arrow-up mr-2" /> View Rack
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="table-responsive-xs table-responsive-sm mt-1 mb-5">
        <table className="table table-striped col-12">
          {getTableHead()}
          {getTableBody()}
        </table>
      </div>
    </div>
  );
};

export default ShelfTable;
