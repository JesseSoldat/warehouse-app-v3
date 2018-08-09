import React from "react";
import QrReader from "react-qr-reader";

const BarcodeScan = ({
  result,
  scanning,
  handleClickUseCamera,
  handleErr,
  handleScan
}) => {
  const UserCameraButton = (
    <button
      className="btn btn-primary mt-3 float-right"
      onClick={handleClickUseCamera}
    >
      <i className="fas fa-camera-retro mr-2" /> Turn Camera{" "}
      {scanning ? "Off" : "On"}
    </button>
  );

  return (
    <div>
      <div className="row">
        <div className="col-12">{UserCameraButton}</div>
      </div>
      <div className="row">
        <div
          className="col-xs-12 col-sm-8 col-md-6 mx-auto"
          style={{ position: "relative" }}
        >
          <div className={scanning ? "visible" : "invisible"}>
            <div>
              <p className="pt-3">{result}</p>
            </div>
            {scanning && (
              <QrReader
                delay={300}
                onError={handleErr}
                onScan={handleScan}
                className="mx-auto w-100"
              />
            )}
          </div>

          <div
            className={scanning ? "invisible" : "visible"}
            style={{ position: "absolute", top: "10px", left: 0, right: 0 }}
          >
            <div className="text-center" style={{ height: "200px" }}>
              <h1>Camera is turned off</h1>
              <i className="fas fa-camera-retro fa-10x mt-2 mr-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScan;
