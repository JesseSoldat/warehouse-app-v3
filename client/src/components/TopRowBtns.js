import React from "react";

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
            <button className="btn btn-primary mr-1" onClick={btn0Cb}>
              <i className="far fa-chevron-left mr-2 d-none d-sm-inline" />
              Go Back
            </button>
          </div>
        )}

        {showRightBtns && (
          <div className="float-right">
            <button
              disabled={bt1Disable}
              className="btn btn-danger mr-1"
              onClick={btn1Cb}
            >
              <i className="far fa-trash-alt mr-2 d-none d-sm-inline" />
              Delete
            </button>
            <button
              disabled={btn2Disable}
              className="btn btn-primary"
              onClick={btn2Cb}
            >
              <i className="fas fa-edit mr-2 d-none d-sm-inline" />
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopRowBtns;
