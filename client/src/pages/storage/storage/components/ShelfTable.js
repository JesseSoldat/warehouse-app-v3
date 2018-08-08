import React from "react";
import { Link } from "react-router-dom";

const ShelfTable = ({ rack, shelfId }) => {
  const storageId = rack.storage._id;
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
                to={`/shelfSpot/${storageId}/${rackId}/${shelfId}/${
                  spot._id
                }?type=shelfSpot`}
              >
                Shelf Spot {spot.shelfSpotLabel}
              </Link>
            </h5>
            {spot.storedItems.length === 0 ? (
              <div>
                <hr />
                <h6 className="pt-3 text-center">No items stored yet</h6>
              </div>
            ) : null}

            <ul className="list-group list-group-flush ">
              {spot.storedItems.map((storedItem, itemIndex) => {
                if (storedItem.kind === "product") {
                  return (
                    <li key={itemIndex} className="text-center list-group-item">
                      <Link to={`/products/${storedItem.item._id}`}>
                        {storedItem.item.productName}
                      </Link>
                    </li>
                  );
                } else {
                  return (
                    <li key={itemIndex} className="text-center list-group-item">
                      <Link to={`/box/${storedItem.item._id}?type=box`}>
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
        <h2 className="my-2 ml-4">Shelf {shelfLabel}</h2>

        <div className="my-2 mr-4">
          <Link
            to={`/shelfSpot/create/${storageId}/${rackId}/${shelfId}?type=shelfSpot`}
          >
            <button className="btn btn-default m-1">
              <i className="fas fa-plus-circle mr-2" /> New Shelf Spot
            </button>
          </Link>

          <Link to={`/shelf/edit/${storageId}/${rackId}/${shelfId}?type=shelf`}>
            <button className="btn btn-default m-1">
              <i className="fas fa-edit mr-2" /> Edit Shelf
            </button>
          </Link>
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
