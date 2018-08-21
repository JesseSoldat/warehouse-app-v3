import React, { Component } from "react";
import { connect } from "react-redux";
import { serverMsg } from "../actions/ui";

class Message extends Component {
  componentWillUpdate(nextProps) {
    const { msg } = nextProps;

    window.scrollTo(0, 0);

    // hide the success message after 3 seconds
    if (msg && msg.code === "hide-3") {
      setTimeout(() => {
        this.closeMessage();
      }, 3000);
    }
  }

  closeMessage = () => {
    this.props.serverMsg(null);
  };

  renderMsg = () => {
    if (this.props.msg) {
      const { heading, details, color, code = null } = this.props.msg;

      const showCbBtn = this.props.cb && code === null ? true : false;

      const showMsg = (
        <div className="row">
          <div className="col-xs-12 col-md-8 mx-auto">
            <div>
              <div
                className={`alert alert-${color} alert-dismissible fade show d-flex`}
                role="alert"
              >
                <span className="mr-auto">
                  <strong>{heading}: </strong>
                  &nbsp; {details}
                </span>

                {showCbBtn && (
                  <a
                    href=""
                    className="ml-auto badge badge-info px-2"
                    onClick={this.props.cb}
                    style={{ verticalAlign: "middle", lineHeight: "22px" }}
                  >
                    Try Again?
                  </a>
                )}
                <button
                  onClick={this.closeMessage}
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
      const showMsgContainer = (
        <div className="row" id="showMsgContainer" style={{ height: "20px" }} />
      );
      return showMsgContainer;
    }
  };

  render() {
    return this.renderMsg();
  }
}

const mapStateToProps = ({ ui }) => ({
  msg: ui.msg
});

export default connect(
  mapStateToProps,
  { serverMsg }
)(Message);
