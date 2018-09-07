import React from "react";
import { Link } from "react-router-dom";

// common components
import IconBtn from "../../../../components/buttons/IconBtn";

const ShelfSpotTable = ({ rack, shelfId, shelfSpotId }) => {
  const storageId = rack.storage._id;
  const { _id: rackId } = rack;
  const { shelves } = rack;

  const shelf = shelves.find(shelf => shelf._id === shelfId);

  const { shelfSpots } = shelf;

  const shelfSpot = shelfSpots.find(shelfSpot => shelfSpot._id === shelfSpotId);

  const { shelfSpotLabel, storedItems = [] } = shelfSpot;

  const getTableHead = () => (
    <thead>
      <tr>
        <th scope="col">
          <Link
            to={`/box/create/${storageId}/${rackId}/${shelfId}/${shelfSpotId}?type=box`}
          >
            <IconBtn
              btnClass="btn-default"
              iconClass="fa-plus-circle mr-1"
              text="New Box"
            />
          </Link>
        </th>
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
      {kind === "product" ? (
        <Link to={`/products/${item._id}`}>{item.productName}</Link>
      ) : (
        <Link
          to={`/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${
            item._id
          }?type=box`}
        >
          Box {item.boxLabel}
        </Link>
      )}
    </td>
  );

  const getTableBody = () => {
    //   // no items
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
    <div className="card card-body mb-3" key={`table-${shelfSpotLabel}`}>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <h2>{shelfSpotLabel}</h2>

        <div>
          <Link
            to={`/barcode/create/${storageId}/${rackId}/${shelfId}/${shelfSpotId}?type=shelfSpot`}
          >
            <IconBtn
              btnClass="btn-default m-1 mr-2"
              iconClass="fa-barcode mr-1"
              text="Create Barcode"
            />
          </Link>
          <Link
            to={`/shelfSpot/edit/${storageId}/${rackId}/${shelfId}/${shelfSpotId}?type=shelfSpot`}
          >
            <IconBtn
              btnClass="btn-default m-1"
              iconClass="fa-edit mr-1"
              text="Edit Spot"
            />
          </Link>
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
