import React from "react";

// common components
import IconBtn from "../../../components/buttons/IconBtn";

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
          <IconBtn
            btnClass="btn-primary mr-2"
            iconClass="fa-link"
            text="Link Items"
            disabled={!firstScannedItemId || !secondScannedItemId}
            type="submit"
          />
          <IconBtn
            btnClass="btn-danger mr-2"
            iconClass="fa-sync-alt"
            text="Reset Items"
            cb={resetItems}
          />
        </form>
      </div>
    </div>
  );
};

export default ScanForm;
