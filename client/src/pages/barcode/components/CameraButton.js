import React from "react";

// common components
import IconBtn from "../../../components/buttons/IconBtn";

const CameraButton = ({ scanning, handleClickUseCamera }) => {
  const text = `Turn Camera ${scanning ? "Off" : "On"}`;

  return (
    <div className="row">
      <div className="col-12">
        {/* small screens */}

        <IconBtn
          btnClass="btn-primary btn-block mt-3 mb-3 d-block d-sm-none"
          iconClass="fa-camera-retro mr-1"
          text={text}
          cb={handleClickUseCamera}
        />

        {/* large screens */}

        <IconBtn
          btnClass="btn-primary mt-3 mb-3 float-right d-none d-sm-block"
          iconClass="fa-camera-retro mr-1"
          text={text}
          cb={handleClickUseCamera}
        />
      </div>
    </div>
  );
};

export default CameraButton;
