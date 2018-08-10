import React from "react";
import QrReader from "react-qr-reader";

const BarcodeScan = ({
  result,
  scanning,
  handleClickUseCamera,
  handleErr,
  handleScan
}) => {
  const cameraButton = (
    <div>
      {/* small screens */}
      <button
        className="btn btn-primary btn-block mt-3 mb-5 d-block d-sm-none"
        onClick={handleClickUseCamera}
      >
        <i className="fas fa-camera-retro mr-2" /> Turn Camera{" "}
        {scanning ? "Off" : "On"}
      </button>
      {/* large screens */}
      <button
        className="btn btn-primary mt-3 mb-5 float-right d-none d-sm-block"
        onClick={handleClickUseCamera}
      >
        <i className="fas fa-camera-retro mr-2" /> Turn Camera{" "}
        {scanning ? "Off" : "On"}
      </button>
    </div>
  );

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
        <h5 className="d-block d-sm-none mb-2">{result}</h5>
        <h3 className="d-none d-sm-block mb-2">{result}</h3>
      </div>
      {scanning && (
        <QrReader delay={300} onError={handleErr} onScan={handleScan} />
      )}
    </div>
  );

  return (
    <div>
      <div className="row">
        <div className="col-12">{cameraButton}</div>
      </div>
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
