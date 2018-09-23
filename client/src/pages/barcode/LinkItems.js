import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// custom components
import BarcodeScan from "./components/BarcodeScan";
// common components
import Message from "../../components/Message";
import Heading from "../../components/Heading";
// helpers
import buildClientMsg from "../../actions/helpers/buildClientMsg";
// actions
import { serverMsg, startShowOverlay } from "../../actions/ui";
import { linkItems } from "../../actions/link";

class LinkItems extends Component {
  // State ----------------------------------------
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

  // Scan Link --------------------------------------
  handleErr = err => {
    console.log(err);
  };

  handleScan = data => {
    if (data) {
      const type = data.split("/")[1];
      const id = data.split("/")[2];

      if (this.state.firstScannedItemType === type) return;

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
          result: "Link Items or Rescan Second Item..."
        };
      }

      this.setState({ ...stateObj });
    }
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

  linkScannedItems = e => {
    e.preventDefault();
    const {
      firstScannedItemId,
      secondScannedItemId,
      firstScannedItemType,
      secondScannedItemType
    } = this.state;

    if (!firstScannedItemId || !secondScannedItemId) return;

    const { history } = this.props;
    const type1 = firstScannedItemType;
    const type2 = secondScannedItemType;

    let obj;

    switch (type1) {
      case "product":
        // PRODUCT TO SHELFSPOT
        if (type2 === "shelfSpot") {
          obj = {
            apiUrl: "/api/scan/productToShelfSpot",
            productId: firstScannedItemId,
            shelfSpotId: secondScannedItemId,
            type1: "product",
            type2: "shelfSpot"
          };
        }
        // PRODUCT TO BOX
        else if (type2 === "box") {
          obj = {
            apiUrl: "/api/scan/productToBox",
            productId: firstScannedItemId,
            boxId: secondScannedItemId,
            type1: "product",
            type2: "box"
          };
        }
        break;

      case "shelfSpot":
        // SHELFSPOT TO PRODUCT
        if (type2 === "product") {
          obj = {
            apiUrl: "/api/scan/productToShelfSpot",
            shelfSpotId: firstScannedItemId,
            productId: secondScannedItemId,
            type1: "shelfSpot",
            type2: "product"
          };
        }
        // SHELFSPOT TO BOX
        else if (type2 === "box") {
          obj = {
            apiUrl: "/api/scan/boxToShelfSpot",
            shelfSpotId: firstScannedItemId,
            boxId: secondScannedItemId,
            type1: "shelfSpot",
            type2: "box"
          };
        }
        break;

      case "box":
        // BOX TO PRODUCT
        if (type2 === "product") {
          obj = {
            apiUrl: "/api/scan/productToBox",
            productId: secondScannedItemId,
            boxId: firstScannedItemId,
            type1: "box",
            type2: "product"
          };
        }
        // BOX TO SHELFSPOT
        else if (type2 === "shelfSpot") {
          obj = {
            apiUrl: "/api/scan/boxToShelfSpot",
            shelfSpotId: secondScannedItemId,
            boxId: firstScannedItemId,
            type1: "box",
            type2: "shelfSpot"
          };
        }
        break;

      default:
        const errorMsg = buildClientMsg({
          info: "You can only link Products, Boxes and ShelfSpot",
          color: "red"
        });
        return this.props.serverMsg(errorMsg);
    }

    // Api Calls
    this.props.startShowOverlay({ from: "linkItemsShowOverlayScanLink" });
    this.props.linkItems(obj, history);
  };

  // Toggle Camera ----------------------------------
  handleClickUseCamera = () => {
    this.setState(({ scanning }) => ({ scanning: !scanning }));
  };

  // Render -------------------------------------
  render() {
    return (
      <div className="container">
        <Message />
        <Heading title="Scan Items" />
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
      </div>
    );
  }
}

export default connect(
  null,
  { linkItems, serverMsg, startShowOverlay }
)(withRouter(LinkItems));
