import React from "react";
import { Link } from "react-router-dom";

// common components
import IconBtn from "../../../../components/buttons/IconBtn";

const RackTable = ({ rack }) => {
  const storageId = rack.storage._id;
  const { _id: rackId, rackLabel, shelves = [] } = rack;

  let max = 0;

  for (let shelf of shelves) {
    const length = shelf["shelfSpots"].length;
    max = length > max ? length : max;
  }

  const getTableHead = () => (
    <thead>
      <tr>
        <th scope="col">
          <Link to={`/shelf/create/${storageId}/${rackId}?type=shelf`}>
            <IconBtn
              btnClass="btn-default"
              iconClass="fa-plus-circle mr-1"
              text="New Shelf"
            />
          </Link>
        </th>
        {max === 0 ? (
          <th key={`spot-head${0}`} scope="col">
            No spots yet - select shelf to create one
          </th>
        ) : (
          [...Array(max).keys()].map(key => (
            <th key={`spot-headrow${key + 1}`} scope="col">
              <span className="d-none d-md-inline">Shelf</span>{" "}
              <span className="d-none d-sm-inline">Spot</span> {key + 1}
            </th>
          ))
        )}
      </tr>
    </thead>
  );

  const getTableBody = () => (
    <tbody>
      {shelves.length === 0 ? (
        <tr>
          <td>No Shelves yet</td>
        </tr>
      ) : (
        shelves.map(({ shelfSpots = [], shelfLabel, _id: shelfId }, i) => (
          <tr key={`shelf-body${i}`}>
            <th scope="row">
              <Link to={`/shelf/${storageId}/${rackId}/${shelfId}?type=shelf`}>
                Shelf {shelfLabel}
              </Link>
            </th>
            {shelfSpots.length > 0 &&
              shelfSpots.map((shelfSpot, i) => {
                const length = shelfSpot.storedItems.length;
                return (
                  <td key={`spot-body${i}`}>
                    <Link
                      to={`/shelfSpot/${storageId}/${rackId}/${shelfId}/${
                        shelfSpot._id
                      }?type=shelfSpot`}
                    >
                      {shelfSpot.storedItems ? length : 0}{" "}
                      <span className="d-none d-sm-inline">
                        {length === 1 ? "Item" : "Items"}
                      </span>
                    </Link>
                  </td>
                );
              })}
          </tr>
        ))
      )}
    </tbody>
  );

  return (
    <div className="card card-body mb-3" key={`table-${rackLabel}`}>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
        <h2>{rackLabel}</h2>

        <div>
          <Link to={`/barcode/create/${storageId}/${rackId}?type=rack`}>
            <IconBtn
              btnClass="btn-default m-1"
              iconClass="fa-barcode mr-1"
              text="Create Barcode"
            />
          </Link>

          <Link to={`/rack/edit/${storageId}/${rackId}?type=rack`}>
            <IconBtn
              btnClass="btn-default m-1"
              iconClass="fa-edit mr-1"
              text="Edit Rack"
            />
          </Link>
        </div>
      </div>

      <div className="table-responsive-xs table-responsive-sm mb-5">
        <table className="table table-striped col-12">
          {getTableHead()}
          {getTableBody()}
        </table>
      </div>
    </div>
  );
};

export default RackTable;
