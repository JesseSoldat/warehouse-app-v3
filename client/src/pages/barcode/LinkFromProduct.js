import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// custom components
import Tabs from "./components/Tabs";
// common components
import Message from "../../components/Message";
import Heading from "../../components/Heading";
// utils
import getUrlParameter from "../../utils/getUrlParameter";
import isEmpty from "../../utils/validation/isEmpty";
// helpers
import buildClientMsg from "../../actions/helpers/buildClientMsg";
// actions
import { serverMsg } from "../../actions/ui";
import { getStorageIds } from "../../actions/storage";
import { linkProduct, relinkProduct } from "../../actions/link";
import { startGetProduct } from "../../actions/product";

class LinkFromProduct extends Component {
  state = {
    formSubmit: false,
    type: "",
    title: "",
    productId: "",
    historyUrl: "",
    // scan -------------
    scanning: false,
    result: ["Please Scan the Second Item..."],
    firstScannedItemId: "",
    firstScannedItemType: "product",
    secondScannedItemId: "",
    secondScannedItemType: "",
    // manual link ---------
    storageId: "",
    rackId: "",
    shelfId: "",
    shelfSpotId: "",
    boxId: ""
  };

  // lifecycles --------------------------------------------
  componentDidMount() {
    this.apiData();
  }

  // data setup and api calls -------------------------------
  apiData = () => {
    const { storageIdsEntity, match, product } = this.props;
    const { productId } = match.params;
    const type = getUrlParameter("type");
    let title = "Link Product";

    if (!storageIdsEntity) {
      this.props.getStorageIds();
    }

    if (type === "restoreProduct") {
      title = "Restore Product";

      if (!product || product._id === productId) {
        this.props.startGetProduct(productId);
      }
    }

    this.setState({
      title,
      productId,
      type,
      historyUrl: `/products/${productId}`,
      firstScannedItemId: productId
    });
  };

  // child component CBs -------------------------------------------
  handleSelectChange = obj => {
    this.setState({ ...obj, formSubmit: false });
  };
  // MANUAL LINK ---------------------------------------------------
  handleLink = e => {
    e.preventDefault();
    this.setState({ formSubmit: true });
    const { type, boxId } = this.state;
    const productTo = boxId ? "box" : "shelfSpot";

    // store in a box or on a shelf spot
    if (type === "storeProduct") {
      this.props.linkProduct(this.state, productTo, this.props.history);
    }
    // restore in a box or on a shelf spot
    else if (type === "restoreProduct") {
      const { productLocation } = this.props.product;

      const prevLocation = {};

      if (productLocation.kind === "shelfSpot") {
        prevLocation["kind"] = "shelfSpot";
        prevLocation["_id"] = productLocation.item._id;
      }
      if (productLocation.kind === "box") {
        prevLocation["kind"] = "box";
        prevLocation["_id"] = productLocation.item._id;
      }

      this.props.relinkProduct(
        this.state,
        productTo,
        prevLocation,
        this.props.history
      );
    }
  };

  // BARCODE ----------------------------------------------
  handleErr = err => {
    console.log(err);
  };

  handleScan = data => {
    if (data) {
      const type = data.split("/")[1];
      const id = data.split("/")[2];

      const stateObj = {
        secondScannedItemType: type,
        secondScannedItemId: id,
        result: "Link Items or Rescan Second Item..."
      };

      this.setState({ ...stateObj });
    }
  };

  resetItems = () => {
    this.setState({
      result: ["Please Scan the Second Item..."],
      secondScannedItemId: "",
      secondScannedItemType: ""
    });
  };

  // SCAN LINK ---------------------------------------------------
  linkScannedItems = e => {
    e.preventDefault();
    const {
      productId,
      secondScannedItemId,
      secondScannedItemType,
      type
    } = this.state;

    if (!productId || !secondScannedItemId) return;

    const { history } = this.props;

    const type2 = secondScannedItemType;

    let obj;

    let prevLocation = this.getPrevLocation(type);

    switch (type2) {
      case "shelfSpot":
        obj = {
          historyUrl: `/products/${productId}`,
          productId,
          shelfSpotId: secondScannedItemId
        };
        if (isEmpty(prevLocation)) {
          return this.props.linkProduct(obj, "shelfSpot", history);
        }
        this.props.relinkProduct(obj, "shelfSpot", prevLocation, history);
        break;

      case "box":
        obj = {
          historyUrl: `/products/${productId}`,
          productId,
          boxId: secondScannedItemId
        };

        if (isEmpty(prevLocation)) {
          return this.props.linkProduct(obj, "box", history);
        }
        this.props.relinkProduct(obj, "box", prevLocation, history);

        break;

      default:
        const errorMsg = buildClientMsg({
          info: "You can only link Products to Boxes and ShelfSpot",
          color: "red"
        });
        this.props.serverMsg(errorMsg);
        break;
    }
  };

  getPrevLocation = type => {
    if (type === "restoreProduct") {
      const { productLocation } = this.props.product;

      let prevLocation = {};

      if (productLocation.kind === "shelfSpot") {
        prevLocation["kind"] = "shelfSpot";
        prevLocation["_id"] = productLocation.item._id;
      }
      if (productLocation.kind === "box") {
        prevLocation["kind"] = "box";
        prevLocation["_id"] = productLocation.item._id;
      }
      return prevLocation;
    }
    return null;
  };

  handleClickUseCamera = () => {
    this.setState(({ scanning }) => ({ scanning: !scanning }));
  };

  render() {
    return (
      <div className="container">
        <Message />
        <Heading title={this.state.title} />
        <Tabs
          // both -----------------------------
          type={this.state.type}
          loading={this.props.loading}
          formSubmit={this.state.formSubmit}
          // scan --------------------------------
          result={this.state.result}
          scanning={this.state.scanning}
          handleClickUseCamera={this.handleClickUseCamera}
          handleErr={this.handleErr}
          handleScan={this.handleScan}
          // Scan Form ---------------------------
          resetItems={this.resetItems}
          linkScannedItems={this.linkScannedItems}
          firstScannedItemId={this.state.firstScannedItemId}
          firstScannedItemType={this.state.firstScannedItemType}
          secondScannedItemId={this.state.secondScannedItemId}
          secondScannedItemType={this.state.secondScannedItemType}
          // manual link -----------------------
          storageIdsEntity={this.props.storageIdsEntity}
          storageId={this.state.storageId}
          rackId={this.state.rackId}
          shelfId={this.state.shelfId}
          shelfSpotId={this.state.shelfSpotId}
          boxId={this.state.boxId}
          handleSelectChange={this.handleSelectChange}
          handleLink={this.handleLink}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ ui, storage, product }) => ({
  loading: ui.loading,
  storageIdsEntity: storage.storageIdsEntity,
  product: product.product
});

export default connect(
  mapStateToProps,
  { serverMsg, getStorageIds, startGetProduct, linkProduct, relinkProduct }
)(withRouter(LinkFromProduct));
