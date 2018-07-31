import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import QrReader from "react-qr-reader";

// common components
import Message from "../../components/Message";
import Heading from "../../components/Heading";
// utils
import getUrlParameter from "../../utils/getUrlParameter";

class BarcodeScan extends Component {
  state = {
    delay: 300,
    scanning: true,
    result: ["Scanning, no results so far..."],
    pastScannedItemId: "",
    pastScannedItemType: ""
  };

  handleErr = err => {
    console.log("err");
    console.log(err);
  };

  handleSuccess = () => {};

  handleScan = data => {
    if (data) {
      console.log("data");
      console.log(data);

      this.setState({
        result: data
      });
    }
  };

  handleClickUseCamera = () => {
    this.setState(({ scanning }) => ({ scanning: !scanning }));
  };

  render() {
    const { result, scanning, pastScannedItemType, delay } = this.state;

    const UserCameraButton = (
      <button
        className="btn btn-primary btn-block my-4"
        onClick={this.handleClickUseCamera}
      >
        <i className="fas fa-camera-retro mr-2" /> Turn Camera{" "}
        {scanning ? "Off" : "On"}
      </button>
    );

    return (
      <div className="container">
        <Message />
        <Heading title="Scan Item" />

        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-6 mx-auto">
            {scanning ? (
              <Fragment>
                <div>
                  <p>{this.state.result}</p>
                </div>
                <QrReader
                  delay={delay}
                  onError={this.handleErr}
                  onScan={this.handleScan}
                  className="mx-auto w-100"
                />
              </Fragment>
            ) : (
              <div>
                <img
                  className="mx-auto w-100"
                  src={require("../../images/noCamera.png")}
                />
              </div>
            )}
            {UserCameraButton}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(BarcodeScan);
