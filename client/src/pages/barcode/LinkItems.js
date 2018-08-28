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
import { serverMsg } from "../../actions/ui";
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
          result: "Link Items or Rescan Second Item..."
        };
      }

      this.setState({ ...stateObj });
    }
  };

  handleClickUseCamera = () => {
    this.setState(({ scanning }) => ({ scanning: !scanning }));
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
            historyUrl: `/products/${firstScannedItemId}`,
            productId: firstScannedItemId,
            shelfSpotId: secondScannedItemId
          };
          const productTo = "shelfSpot";
          this.props.linkProduct(obj, productTo, history);
        }
        // PRODUCT TO BOX
        else if (type2 === "box") {
          obj = {
            historyUrl: `/products/${firstScannedItemId}`,
            productId: firstScannedItemId,
            boxId: secondScannedItemId
          };
          const productTo = "box";
          this.props.linkProduct(obj, productTo, history);
        }
        break;

      case "shelfSpot":
        // SHELFSPOT TO PRODUCT
        if (type2 === "product") {
          obj = {
            historyUrl: `/products/${secondScannedItemId}`,
            shelfSpotId: firstScannedItemId,
            productId: secondScannedItemId
          };
          const productTo = "shelfSpot";
          this.props.linkProduct(obj, productTo, history);
        }
        // SHELFSPOT TO BOX
        else if (type2 === "box") {
        }
        break;

      case "box":
        // BOX TO PRODUCT
        if (type2 === "product") {
          obj = {
            historyUrl: `/products/${secondScannedItemId}`,
            boxId: firstScannedItemId,
            productId: secondScannedItemId
          };
          const productTo = "box";
          this.props.linkProduct(obj, productTo, history);
        }
        // BOX TO SHELFSPOT
        else if (type2 === "shelfSpot") {
        }
        break;

      default:
        // TODO ERROR MSG not a supported linking type
        const errorMsg = buildClientMsg({
          info: "You can only link Products, Boxes and ShelfSpot",
          color: "red"
        });
        this.props.serverMsg(errorMsg);
        break;
    }
  };

  render() {
    return (
      <div className="container">
        <Message />
        <Heading title={this.state.title} />
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
  { serverMsg, linkProduct, linkBox }
)(withRouter(LinkItems));
