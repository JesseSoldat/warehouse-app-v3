import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// custom components
import BarcodeScan from "./components/BarcodeScan";
// common components
import Message from "../../components/Message";
import Heading from "../../components/Heading";
// utils
// actions
import { linkProduct, linkBox } from "../../actions/link";

class LinkItems extends Component {
  state = {
    title: "",
    showScan: false,
    scanning: false,
    result: ["Please Scan the First Item..."],
    firstScannedItemId: "",
    firstScannedItemType: "",
    secondScannedItemId: "",
    secondScannedItemType: "",
    scanItem: "1"
  };

  // BARCODE ----------------------------------------------
  handleErr = err => {
    console.log(err);
  };

  handleSuccess = () => {};

  handleScan = data => {
    if (data) {
      const type = data.split("/")[1];
      const id = data.split("/")[2];

      let stateObj;

      if (this.state.scanItem === "1") {
        stateObj = {
          firstScannedItemType: type,
          firstScannedItemId: id,
          result: "Please Scan the Second Item...",
          scanItem: "2"
        };
      } else {
        stateObj = {
          secondScannedItemType: type,
          secondScannedItemId: id,
          result: `Link Items or Rescan Second Item...`
        };
      }

      this.setState({
        ...stateObj
      });
    }
  };

  handleClickUseCamera = () => {
    this.setState(({ scanning }) => ({ scanning: !scanning }));
  };

  linkScannedItems = e => {
    e.preventDefault();
    const { firstScannedItemId, secondScannedItemId } = this.state;
    if (!firstScannedItemId || !secondScannedItemId) return;

    const apiType = this.chooseScanType();
    console.log("apiType", apiType);
  };

  resetItems = () => {
    this.setState({
      result: ["Please Scan the First Item..."],
      firstScannedItemId: "",
      firstScannedItemType: "",
      secondScannedItemId: "",
      secondScannedItemType: "",
      scanItem: "1"
    });
  };

  chooseScanType = () => {
    const { firstScannedItemType, secondScannedItemType } = this.state;
    const type1 = firstScannedItemType;
    const type2 = secondScannedItemType;

    let apiType;

    switch (type1) {
      case "product":
        if (type2 === "shelfSpot") {
          apiType = "productToShelfSpot";
        } else if (type2 === "box") {
          apiType = "productToBox";
        }
        break;

      case "shelfSpot":
        if (type2 === "product") {
          apiType = "productToShelfSpot";
        } else if (type2 === "box") {
          apiType = "boxToShelfSpot";
        }
        break;

      case "box":
        if (type2 === "product") {
          apiType = "productToBox";
        } else if (type2 === "shelfSpot") {
          apiType = "boxToShelfSpot";
        }
        break;

      default:
        // TODO ERROR MSG not a supported linking type
        break;
    }

    return apiType;
  };

  // Render Content ------------------------------------
  renderScanResults = () => {
    <div className="row">
      <div className="col-12" />
    </div>;
  };
  renderScanContent = () => (
    <BarcodeScan
      type={this.state.type}
      result={this.state.result}
      scanning={this.state.scanning}
      handleClickUseCamera={this.handleClickUseCamera}
      handleErr={this.handleErr}
      handleScan={this.handleScan}
      linkScannedItems={this.linkScannedItems}
      resetItems={this.resetItems}
      firstScannedItemType={this.state.firstScannedItemType}
      firstScannedItemId={this.state.firstScannedItemId}
      secondScannedItemType={this.state.secondScannedItemType}
      secondScannedItemId={this.state.secondScannedItemId}
    />
  );

  render() {
    let content = this.renderScanContent();

    return (
      <div className="container">
        <Message />
        <Heading title={this.state.title} />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui }) => ({
  loading: ui.loading
});

export default connect(
  mapStateToProps,
  { linkProduct, linkBox }
)(withRouter(LinkItems));
