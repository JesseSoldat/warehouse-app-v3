import React from "react";
import { Link } from "react-router-dom";

// common components
import CardList from "../../../../components/CardList";
// helpers
import productCardData from "../helpers/productCardData";

const BoxTable = ({ box }) => {
  console.log(box);
  const { _id: boxId, boxLabel, storedItems = [] } = box;
  const { shelfSpot } = box;

  return (
    <div className="card card-body mb-3" style={{ minHeight: "400px" }}>
      <div className="d-flex flex-wrap justify-content-between mb-3">
        <h2 className="my-2 ml-2">Box {boxLabel}</h2>

        <div>
          <Link to={`/box/edit/${boxId}?type=box`}>
            <button className="btn btn-default mr-2">
              <i className="fas fa-edit mr-2" /> Edit Box
            </button>
          </Link>
        </div>
      </div>
      <div className="table-responsive-xs table-hover table-responsive-sm mb-5">
        <table className="table col-12 mt-5">
          <tbody>
            {!shelfSpot && (
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
            )}

            {storedItems.length === 0 && (
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
            )}
          </tbody>
        </table>
      </div>

      <CardList data={productCardData(storedItems)} />
    </div>

    // {!shelfSpot && (
    //   <div className="p-3 mt-5 mb-3">
    //     <h3>The Box is not Stored</h3>
    //   </div>
    // )}
    // {storedItems.length === 0 ? (
    //   <div className="p-3">
    //     <h3>No Products Stored</h3>
    //   </div>
    // ) : (
    // )}
  );
};

export default BoxTable;
