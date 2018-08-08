import React from "react";
import { Link } from "react-router-dom";

// common components
import CardList from "../../../../components/CardList";
// helpers
import productCardData from "../helpers/productCardData";

const BoxTable = ({ location, rack, shelfId, shelfSpotId, boxId }) => {
  let rackId,
    storageId,
    shelf,
    shelfSpot,
    box,
    notStored,
    haveProducts,
    noProducts,
    boxLabel;
  let storedItems = [];
  let editLink = `/box/edit/${boxId}?type=box`;

  // NO location
  if (!location) {
    notStored = (
      <tr className="py-4">
        <td>
          <h4 className="pt-1">The Box is not Stored</h4>
        </td>
        <td>
          <Link to="/barcode/scan?type=linkBoxToSpot">
            <button className="btn btn-default float-right">
              <i className="fas fa-archive mr-2" /> Store Box
            </button>
          </Link>
        </td>
      </tr>
    );
  }
  // have location
  else {
    rackId = rack._id;
    storageId = rack.storage._id;

    editLink = `/box/edit/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=box`;

    shelf = rack.shelves.find(shelf => shelf._id === shelfId);
    // console.log("shelf");
    // console.log(shelf);
    shelfSpot = shelf.shelfSpots.find(spot => spot._id === shelfSpotId);
    // console.log("shelfSpot");
    // console.log(shelfSpot);
    box = shelfSpot.storedItems.find(
      storedItem => storedItem.item._id === boxId
    );
    console.log("box");
    console.log(box);
    boxLabel = box.item;
    storedItems = box.item;
  }

  // have products
  if (storedItems.length > 0) {
    haveProducts = <CardList data={productCardData(storedItems)} />;
  }
  // no products
  else {
    noProducts = (
      <tr className="py-4">
        <td>
          <h4 className="pt-1">No Products Stored</h4>
        </td>
        <td>
          <Link to="/barcode/scan?type=linkProductToBox">
            <button className="btn btn-default float-right">
              <i className="fas fa-link mr-2" /> Link Product
            </button>
          </Link>
        </td>
      </tr>
    );
  }

  return (
    <div className="card card-body mb-3" style={{ minHeight: "400px" }}>
      <div className="d-flex flex-wrap justify-content-between mb-3">
        <h2 className="my-2 ml-2">Box {boxLabel}</h2>

        <div>
          <Link to={editLink}>
            <button className="btn btn-default mr-2">
              <i className="fas fa-edit mr-2" /> Edit Box
            </button>
          </Link>
        </div>
      </div>

      <div className="table-responsive-xs table-hover table-responsive-sm">
        <table className="table col-12 mt-5">
          <tbody>
            {notStored}
            {noProducts}
          </tbody>
        </table>
      </div>

      {haveProducts}
    </div>
  );
};

export default BoxTable;
