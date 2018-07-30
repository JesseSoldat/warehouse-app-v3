import React from "react";
import { Link } from "react-router-dom";

// helpers
import isEmpty from "../../../../utils/validation/isEmpty";

const ShelfSpotTable = ({ storage }) => {
  // console.log("shelfSpotTable");
  // console.log(storage);

  const { _id, spotLabel, storedItems = [], shelf } = storage;

  const getTableHead = () => (
    <thead>
      <tr>
        {storedItems.length === 0 ? (
          <th scope="col">No Items stored yet</th>
        ) : (
          <th scope="col">
            {`${storedItems.length} Item${
              storedItems.length === 1 ? "" : "s"
            } stored`}
          </th>
        )}
      </tr>
    </thead>
  );

  const getTableCell = (item, kind, itemIndex) => (
    <td key={`cellData-${itemIndex}`}>
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
    // no items
    if (!storedItems.length) {
      return (
        <tbody>
          <tr>
            <td>No Items stored yet</td>
          </tr>
        </tbody>
      );
    }
    // have items
    const bodyData = [];

    storedItems.forEach(({ item, kind }, itemIndex) => {
      // create an array
      if (!bodyData[itemIndex]) bodyData[itemIndex] = [];

      bodyData[itemIndex].push(getTableCell(item, kind, itemIndex));
    });

    return (
      <tbody>
        {bodyData.map((rowData, rowIndex) => (
          <tr key={`rowData-${rowIndex}`}>
            {rowData.map((cellData, cellIndex) => rowData[cellIndex])}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="card card-body mb-3" key={`table-${spotLabel}`}>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <h2>Shelf Spot {spotLabel}</h2>

        <div>
          <Link to={`/storages/edit/${_id}?type=shelfSpot`}>
            <button className="btn btn-default m-1">
              <i className="fas fa-edit mr-2" /> Edit Spot
            </button>
          </Link>

          {!isEmpty(shelf) && (
            <Link to={`/storages/${shelf._id}?type=shelf`}>
              <button className="btn btn-default m-1">
                <i className="fas fa-arrow-up mr-2" /> View Shelf
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

export default ShelfSpotTable;
