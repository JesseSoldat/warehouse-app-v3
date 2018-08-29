import React from "react";
import { Link } from "react-router-dom";

// common components
import CardList from "../../../../components/CardList";
// helpers
import productCardData from "../helpers/productCardData";

const BoxTable = ({
  // both
  location,
  // have location
  ids,
  rack,
  // no location
  items,
  boxId,
  boxLabel,
  // cb
  removeFromShelfSpot
}) => {
  let storedItems = [];

  // NO location ----------------------------------------------
  // default URL for when the box has no location
  let editUrl = `/box/edit/${boxId}?type=box&location=false`;
  let boxToSpotUrl = `/barcode/scan/box/${boxId}?type=linkBoxToSpot&location=false`;
  let productToBoxUrl = `/barcode/scan/box/${boxId}?type=linkProductToBox&location=false`;
  let barcodeUrl = `/barcode/create/box/${boxId}?type=box`;
  let notStored;
  if (!location) {
    if (items) {
      storedItems = items;
    }
    notStored = (
      <tr className="py-4">
        <td>
          <h4 className="pt-1">The Box is not Stored</h4>
        </td>
        <td>
          <Link to={boxToSpotUrl}>
            <button className="btn btn-default float-right">
              <i className="fas fa-archive mr-2" /> Store Box
            </button>
          </Link>
        </td>
      </tr>
    );
  }
  // have location --------------------------------------
  let label = boxLabel;
  let shelf, shelfSpot, box;

  if (location) {
    const { storageId, rackId, shelfId, shelfSpotId } = ids;
    boxId = ids.boxId;

    // change the URL for a box with a location
    editUrl = `/box/edit/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=box&location=true`;
    boxToSpotUrl = `/barcode/scan/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=linkBoxToSpot&location=true`;
    productToBoxUrl = `/barcode/scan/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=linkProductToBox&location=true`;
    barcodeUrl = `/barcode/create/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=box`;

    // get the BOX from the RACK object
    shelf = rack.shelves.find(shelf => shelf._id === shelfId);

    shelfSpot = shelf.shelfSpots.find(spot => spot._id === shelfSpotId);

    box = shelfSpot.storedItems.find(
      storedItem => storedItem.item._id === boxId
    );

    label = box.item.boxLabel;
    storedItems = box.item.storedItems;
  }

  // have products --------------------------------------------
  let haveProducts;
  if (storedItems.length > 0) {
    haveProducts = <CardList data={productCardData(storedItems)} />;
  }
  // no products ------------------------------------------------
  let noProducts;
  if (storedItems.length === 0) {
    noProducts = (
      <tr className="py-4">
        <td>
          <h4 className="pt-1">No Products Stored</h4>
        </td>
        <td>
          <Link to={productToBoxUrl}>
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
        {location ? (
          <button
            className="btn btn-default m-1 mr-2"
            onClick={removeFromShelfSpot}
          >
            <i className="fas fa-minus-circle mr-2" /> Remove from Shelf Spot
          </button>
        ) : (
          <h2 className="my-2 ml-2">Box {label}</h2>
        )}

        <div>
          <Link to={barcodeUrl}>
            <button className="btn btn-default m-1 mr-2">
              <i className="fas fa-barcode mr-2" /> Create Barcode
            </button>
          </Link>
          <Link to={editUrl}>
            <button className="btn btn-default mr-2">
              <i className="fas fa-edit mr-2" /> Edit Box
            </button>
          </Link>
        </div>
      </div>

      {location && (
        <div className="row">
          <div className="col-12">
            <h2 className="my-2 ml-2">Box {label}</h2>
          </div>
        </div>
      )}

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
