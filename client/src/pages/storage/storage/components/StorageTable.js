import React from "react";
import { Link } from "react-router-dom";

const StorageTable = ({ storage = null, storageType = null }) => {
  if (!storage || !storageType) return null;

  const { _id, storageLabel, racks = [], description } = storage;
  let maxShelves = 0;

  for (let rack of racks) {
    const length = rack.shelves.length;
    maxShelves = length > maxShelves ? length : maxShelves;
  }

  const tableHead = () => (
    <thead>
      <tr>
        <th scope="col">
          <Link to={`/storages/create/${_id}?type=rack`}>
            <button className="btn btn-default">
              <i className="fas fa-plus-circle mr-2" /> New Rack
            </button>
          </Link>
        </th>
        {maxShelves === 0 ? (
          <th key={`shelf-head`} scope="col">
            {" "}
            No shelves yet - select rack to create one
          </th>
        ) : (
          [...Array(maxShelves).keys()].map(key => (
            <th key={`shelf-head-${key + 1}`} scope="col">
              Shelf {key + 1}
            </th>
          ))
        )}
      </tr>
    </thead>
  );

  const tableBody = () => (
    <tbody>
      {racks.length === 0 ? (
        <tr>
          <td>No racks yet</td>
        </tr>
      ) : (
        racks.map(({ _id: rackId, shelves = [], rackLabel }, i) => (
          <tr key={`rack-body${i}`}>
            <th scope="row">
              <Link to={`/storages/${rackId}?type=rack`}>Rack {rackLabel}</Link>
            </th>
            {shelves.length === 0
              ? null
              : shelves.map((shelf, i) => (
                  <td key={`shelf-body-${i}`}>
                    <Link to={`/storages/${shelf._id}?type=shelf`}>
                      Shelf Spots{" "}
                      {shelf.shelfSpots ? shelf.shelfSpots.length : 0}
                    </Link>
                  </td>
                ))}
          </tr>
        ))
      )}
    </tbody>
  );

  return (
    <div className="card card-body mb-3" key={`table-${storageLabel}`}>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
        <h2 className="ml-3">{storageLabel}</h2>

        <Link to={`/storages/edit/${_id}?type=storage`} className="mr-3">
          <button className="btn btn-default m-1">
            <i className="fas fa-edit mr-2" /> Edit Storage
          </button>
        </Link>
      </div>
      <p className="ml-3">{description}</p>

      <div className="table-responsive-xs table-responsive-sm mb-5">
        <table className="table table-striped col-12">
          {tableHead()}
          {tableBody()}
        </table>
      </div>
    </div>
  );
};

export default StorageTable;
