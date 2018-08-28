import React from "react";
import QrReader from "react-qr-reader";

// custom components
import CameraButton from "./CameraButton";
import ScanForm from "./ScanForm";

const BarcodeScan = ({
  result,
  scanning,
  handleClickUseCamera,
  handleErr,
  handleScan,
  linkScannedItems,
  resetItems,
  firstScannedItemType,
  firstScannedItemId,
  secondScannedItemType,
  secondScannedItemId
}) => {
  const cameraIsOff = (
    <div
      className={scanning ? "invisible" : "visible"}
      style={{ width: "100%" }}
    >
      <div
        className="text-center mx-auto"
        style={{ height: "300px", marginTop: "-15px" }}
      >
        <h4 className="d-block d-sm-none">Camera is turned off</h4>
        <h2 className="d-none d-sm-block">Camera is turned off</h2>

        <i className="fas fa-camera-retro fa-10x mt-2 mr-2" />
      </div>
    </div>
  );

  const cameraIsOn = (
    <div className={scanning ? "visible" : "invisible"}>
      <div style={{ marginTop: "-20px" }}>
        <h5 className="d-block d-sm-none mb-2">
          <b>
            {firstScannedItemType} {firstScannedItemType && "->"}{" "}
            {secondScannedItemType}
          </b>
        </h5>
        <h5 className="d-block d-sm-none mb-2">{result}</h5>

        <h4 className="d-none d-sm-block mb-2">
          <b>
            {firstScannedItemType} {firstScannedItemType && "->"}{" "}
            {secondScannedItemType}
          </b>
        </h4>
        <h4 className="d-none d-sm-block mb-2">{result}</h4>
      </div>
      {scanning && (
        <QrReader delay={300} onError={handleErr} onScan={handleScan} />
      )}
    </div>
  );

  return (
    <div>
      <CameraButton
        scanning={scanning}
        handleClickUseCamera={handleClickUseCamera}
      />
      <ScanForm
        linkScannedItems={linkScannedItems}
        resetItems={resetItems}
        firstScannedItemType={firstScannedItemType}
        firstScannedItemId={firstScannedItemId}
        secondScannedItemType={secondScannedItemType}
        secondScannedItemId={secondScannedItemId}
      />
      <div className="row">
        <div className="col-xs-12 col-sm-8 col-md-6 mx-auto">
          {cameraIsOn}
          {cameraIsOff}
        </div>
      </div>
    </div>
  );
};

export default BarcodeScan;
