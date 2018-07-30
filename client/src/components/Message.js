import React from "react";
import { connect } from "react-redux";

import { serverMsg } from "../actions/ui";

const Message = ({ uiMsg, serverMsg, cb = null }) => {
  const closeMessage = () => {
    serverMsg(null);
  };

  const showMsgContainer = (
    <div className="row" id="showMsgContainer" style={{ height: "20px" }} />
  );

  const renderMsg = () => {
    if (uiMsg) {
      const { heading, details, color, code = null } = uiMsg;

      const showCbBtn = cb && code === null ? true : false;

      const showMsg = (
        <div className="row">
          <div className="col-xs-12 col-md-8 mx-auto">
            <div>
              <div
                className={`alert alert-${color} alert-dismissible fade show d-flex`}
                role="alert"
              >
                <span className="mr-auto">
                  <strong>{heading}: </strong>&nbsp; {details}
                </span>

                {showCbBtn && (
                  <a
                    href=""
                    className="ml-auto badge badge-info px-2"
                    onClick={cb}
                    style={{ verticalAlign: "middle", lineHeight: "22px" }}
                  >
                    Try Again?
                  </a>
                )}
                <button
                  onClick={closeMessage}
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );

      return showMsg;
    } else {
      return showMsgContainer;
    }
  };

  return renderMsg();
};

const mapStateToProps = ({ ui }) => ({
  uiMsg: ui.msg
});

export default connect(
  mapStateToProps,
  { serverMsg }
)(Message);
