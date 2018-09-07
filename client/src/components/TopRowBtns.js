import React from "react";

// common components
import IconBtn from "./buttons/IconBtn";

const TopRowBtns = ({
  bt1Disable = false,
  btn2Disable = false,
  btn0Cb,
  btn1Cb,
  btn2Cb,
  showLeftBtns = false,
  showRightBtns = false
}) => {
  return (
    <div className="row" style={{ marginTop: "-25px", marginBottom: "15px" }}>
      <div className="col-12">
        {showLeftBtns && (
          <div className="float-left">
            <IconBtn
              btnClass="btn-primary mr-1"
              iconClass="fa-chevron-left d-none d-sm-inline"
              text="Go Back"
              cb={btn0Cb}
            />
          </div>
        )}

        {showRightBtns && (
          <div className="float-right">
            <IconBtn
              btnClass="btn-danger mr-1"
              iconClass="fa-trash-alt d-none d-sm-inline"
              text="Delete"
              cb={btn1Cb}
              disabled={bt1Disable}
            />

            <IconBtn
              btnClass="btn-primary"
              iconClass="fa-edit d-none d-sm-inline"
              text="Edit"
              cb={btn2Cb}
              disabled={btn2Disable}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopRowBtns;
