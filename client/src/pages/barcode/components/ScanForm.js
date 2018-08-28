import React from "react";

const ScanForm = ({
  linkScannedItems,
  resetItems,
  firstScannedItemType,
  firstScannedItemId,
  secondScannedItemType,
  secondScannedItemId
}) => {
  const input1 = firstScannedItemId
    ? `${firstScannedItemType}: ${firstScannedItemId}`
    : "";
  const input2 = secondScannedItemId
    ? `${secondScannedItemType}: ${secondScannedItemId}`
    : "";

  return (
    <div className="row">
      <div className="col-12 mb-5">
        <form onSubmit={linkScannedItems}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Result #1</label>
              <input
                className="form-control"
                placeholder="Scan first item"
                disabled
                value={input1}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Result #2</label>
              <input
                className="form-control"
                placeholder="Scan second item"
                disabled
                value={input2}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary mr-2"
            disabled={!firstScannedItemId || !secondScannedItemId}
          >
            Link Items
          </button>
          <button onClick={resetItems} type="button" className="btn btn-danger">
            Reset Items
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScanForm;
