import React from "react";

const CameraButton = ({ scanning, handleClickUseCamera }) => {
  const cameraButton = (
    <div>
      {/* small screens */}
      <button
        className="btn btn-primary btn-block mt-3 mb-3 d-block d-sm-none"
        onClick={handleClickUseCamera}
      >
        <i className="fas fa-camera-retro mr-2" /> Turn Camera{" "}
        {scanning ? "Off" : "On"}
      </button>
      {/* large screens */}
      <button
        className="btn btn-primary mt-3 mb-3 float-right d-none d-sm-block"
        onClick={handleClickUseCamera}
      >
        <i className="fas fa-camera-retro mr-2" /> Turn Camera{" "}
        {scanning ? "Off" : "On"}
      </button>
    </div>
  );

  return (
    <div className="row">
      <div className="col-12">{cameraButton}</div>
    </div>
  );
};

export default CameraButton;
