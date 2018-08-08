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
    console.log("no data", data);

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
    const { result, scanning, delay } = this.state;

    const UserCameraButton = (
      <button
        className="btn btn-primary mt-3 float-right"
        onClick={this.handleClickUseCamera}
      >
        <i className="fas fa-camera-retro mr-2" /> Turn Camera{" "}
        {scanning ? "Off" : "On"}
      </button>
    );

    return (
      <div className="container">
        <Message />
        <Heading title="Link Item" />

        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Scan
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Manual Link
            </a>
          </li>
        </ul>

        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="row">
              <div className="col-12">{UserCameraButton}</div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-8 col-md-6 mx-auto">
                {/* do not delete the span */}
                <span />
                {scanning ? (
                  <Fragment>
                    <div>
                      <p className="pt-3">{result}</p>
                    </div>
                    <QrReader
                      delay={delay}
                      onError={this.handleErr}
                      onScan={this.handleScan}
                      className="mx-auto w-100"
                    />
                  </Fragment>
                ) : (
                  <div className="text-center" style={{ height: "200px" }}>
                    <h1>Camera is turned off</h1>
                    <i className="fas fa-camera-retro fa-10x mt-2 mr-2" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            Manual Link
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(BarcodeScan);
