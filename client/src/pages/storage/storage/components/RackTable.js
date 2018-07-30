import React from "react";
import { Link } from "react-router-dom";

// helpers
import isEmpty from "../../../../utils/validation/isEmpty";

const RackTable = ({ storage, storageType }) => {
  const { _id, rackLabel, shelves = [] } = storage;

  // console.log('Rack Table');
  // console.log(storage);

  let max = 0;

  for (let shelf of shelves) {
    const length = shelf["shelfSpots"].length;
    max = length > max ? length : max;
  }

  const getTableHead = () => (
    <thead>
      <tr>
        <th scope="col">
          <Link to={`/storages/create/${_id}?type=shelf`}>
            <button className="btn btn-default">
              <i className="fas fa-plus-circle mr-2" /> New Shelf
            </button>
          </Link>
        </th>
        {max === 0 ? (
          <th key={`spot-head${0}`} scope="col">
            No spots yet - select shelf to create one
          </th>
        ) : (
          [...Array(max).keys()].map(key => (
            <th key={`spot-headrow${key + 1}`} scope="col">
              Spot {key + 1}
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
        shelves.map(({ _id: shelfId, shelfSpots = [], shelfLabel }, i) => (
          <tr key={`shelf-body${i}`}>
            <th scope="row">
              <Link to={`/storages/${shelfId}?type=shelf`}>
                Shelf {shelfLabel}
              </Link>
            </th>
            {shelfSpots.length > 0 &&
              shelfSpots.map((shelfSpot, i) => (
                <td key={`spot-body${i}`}>
                  <Link to={`/storages/${shelfSpot._id}?type=shelfSpot`}>
                    Items{" "}
                    {shelfSpot.storedItems ? shelfSpot.storedItems.length : 0}
                  </Link>
                </td>
              ))}
          </tr>
        ))
      )}
    </tbody>
  );

  return (
    <div className="card card-body mb-3" key={`table-${rackLabel}`}>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
        <h2>Rack {rackLabel}</h2>

        <Link to={`/storages/edit/${_id}?type=rack`}>
          <button className="btn btn-default m-1">
            <i className="fas fa-edit mr-2" /> Edit Rack
          </button>
        </Link>

        {!isEmpty(storage.storage) && (
          <Link to={`/storages/${storage.storage._id}?type=storage`}>
            <button className="btn btn-default m-1">
              <i className="fas fa-arrow-up mr-2" /> View Storage
            </button>
          </Link>
        )}
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
