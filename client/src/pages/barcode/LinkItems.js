import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// custom components
import BarcodeScan from "./components/BarcodeScan";
import ManualLink from "./components/ManualLink";
// common components
import Message from "../../components/Message";
import Heading from "../../components/Heading";
// utils
import getUrlParameter from "../../utils/getUrlParameter";
// actions
import { getStorageIds } from "../../actions/storage";

class LinkItems extends Component {
  state = {
    scanning: true,
    result: ["Scanning, no results so far..."],
    pastScannedItemId: "",
    pastScannedItemType: ""
  };

  // lifecycles --------------------------------------------
  componentDidMount() {
    this.props.getStorageIds();
  }

  // MANUAL LINK ----------------------------------------

  // BARCODE ----------------------------------------------
  handleErr = err => {
    console.log("err");
    console.log(err);
  };

  handleSuccess = () => {};

  handleScan = data => {
    // console.log("no data", data);

    if (data) {
      // console.log("data");
      // console.log(data);

      this.setState({
        result: data
      });
    }
  };

  handleClickUseCamera = () => {
    this.setState(({ scanning }) => ({ scanning: !scanning }));
  };

  render() {
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
            <BarcodeScan
              result={this.state.result}
              scanning={this.state.scanning}
              handleClickUseCamera={this.handleClickUseCamera}
              handleErr={this.handleErr}
              handleScan={this.handleScan}
            />
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

const mapStateToProps = ({ ui, storage }) => ({
  loading: ui.loading,
  storageIdsEntity: storage.storageIdsEntity
});

export default connect(
  mapStateToProps,
  { getStorageIds }
)(LinkItems);
