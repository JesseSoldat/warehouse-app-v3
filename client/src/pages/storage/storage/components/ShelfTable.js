import React from "react";
import { Link } from "react-router-dom";

// helpers
import isEmpty from "../../../../utils/validation/isEmpty";

const ShelfTable = ({ rack, shelfId }) => {
  const { _id: rackId, shelves } = rack;

  const shelf = shelves.find(shelf => shelf._id === shelfId);

  const { shelfLabel, shelfSpots = [] } = shelf;

  const getShelfSpotCards = () => {
    return shelfSpots.map((spot, spotIndex) => {
      return (
        <div key={spotIndex} className="card my-2" style={{ width: "300px" }}>
          <div className="card-body">
            <h5 className="mt-3 text-center card-title">
              <Link
                to={`/storages/${rackId}?shelfId=${shelfId}&shelfSpotId=${
                  spot._id
                }&type=shelfSpot`}
              >
                Shelf Spot {spot.shelfSpotLabel}
              </Link>
            </h5>
            {spot.storedItems.length === 0 ? (
              <h6 className="text-center">No items stored yet</h6>
            ) : null}

            <ul className="list-group">
              {spot.storedItems.map((storedItem, itemIndex) => {
                if (storedItem.kind === "product") {
                  return (
                    <li key={itemIndex} className="text-center list-group-item">
                      <Link to={`/products/${storedItem.item._id}?type=box`}>
                        {storedItem.item.productName}
                      </Link>
                    </li>
                  );
                } else {
                  return (
                    <li key={itemIndex} className="text-center list-group-item">
                      <Link to={`/storages/${storedItem.item._id}?type=box`}>
                        Box {storedItem.item.boxLabel}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="card card-body mb-3">
      <div className="d-flex flex-wrap justify-content-between mb-3">
        <h2>Shelf {shelfLabel}</h2>

        <div>
          <Link to={`/storages/edit/${rackId}?shelfId=${shelfId}&type=shelf`}>
            <button className="btn btn-default m-1">
              <i className="fas fa-edit mr-2" /> Edit Shelf
            </button>
          </Link>

          {!isEmpty(rack) && (
            <Link to={`/storages/${rackId}?type=rack`}>
              <button className="btn btn-default m-1">
                <i className="fas fa-arrow-up mr-2" /> View Rack
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-12 mx-auto d-flex justify-content-around flex-wrap">
          {getShelfSpotCards()}
        </div>
      </div>
    </div>
  );
};

export default ShelfTable;
