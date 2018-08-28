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
// helpers
import buildClientMsg from "../../actions/helpers/buildClientMsg";
// actions
import { serverMsg } from "../../actions/ui";
import { getStorageIds } from "../../actions/storage";
import { linkProduct, linkBox } from "../../actions/link";
import { startGetProducts } from "../../actions/product";

class LinkFromBox extends Component {
  state = {
    formSubmit: false,
    type: "",
    location: null,
    title: "",
    productId: "",
    historyUrl: "",
    // scan -------------
    scanning: false,
    result: ["Please Scan the Second Item..."],
    firstScannedItemId: "",
    firstScannedItemType: "box",
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

  // STATE setup and API calls ----------------------------------------
  apiData = () => {
    const { storageIdsEntity, match } = this.props;
    const { boxId } = match.params;
    const type = getUrlParameter("type");
    const location = getUrlParameter("location");

    // PRODUCT in BOX ---------------------------------------
    if (type === "linkProductToBox") {
      // fetch orphans to put in the box
      this.props.startGetProducts({
        searchType: "orphans",
        skip: 0,
        limit: 100,
        page: 0
      });

      // No location
      let historyUrl = `/box/${boxId}?type=box`;
      // Have location
      if (location === "true") {
        const { storageId, rackId, shelfId, shelfSpotId } = match.params;
        historyUrl = `/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=box`;
      }

      this.setState({
        title: "Link Product to Box",
        boxId,
        type,
        historyUrl,
        location,
        firstScannedItemId: boxId
      });
    }
    // BOX to SHELF SPOT ------------------------------------
    else if (type === "linkBoxToSpot") {
      if (!storageIdsEntity) {
        this.props.getStorageIds();
      }

      this.setState({
        title: "Link Box",
        boxId,
        type,
        location: false,
        firstScannedItemId: boxId
      });
    }
  };

  handleSelectChange = obj => {
    this.setState({ ...obj, formSubmit: false });
  };

  handleLink = e => {
    e.preventDefault();
    this.setState({ formSubmit: true });

    const { boxId } = this.props.match.params;
    const newState = { ...this.state, boxId };

    this.props.linkBox(newState, this.props.history);
  };

  handleLinkProductToBox = productId => {
    const { boxId, historyUrl } = this.state;
    this.setState({ formSubmit: true });
    const obj = { boxId, productId, historyUrl };
    this.props.linkProduct(obj, "box", this.props.history);
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

  handleClickUseCamera = () => {
    this.setState(({ scanning }) => ({ scanning: !scanning }));
  };

  // linking flow -------------------------------------------------
  linkScannedItems = e => {
    e.preventDefault();
    const {
      boxId,
      secondScannedItemId,
      secondScannedItemType,
      type,
      location,
      historyUrl
    } = this.state;

    if (!boxId || !secondScannedItemId) return;

    const { history } = this.props;

    const type2 = secondScannedItemType;

    if (type === "linkProductToBox") {
      // LINK BOX WITH A PRODUCT
      if (type2 !== "product") {
        const errorMsg = buildClientMsg({
          info: "Please link the box with a product",
          color: "red"
        });
        this.props.serverMsg(errorMsg);
        return;
      }
      const productId = secondScannedItemId;

      if (location) {
        const obj = { boxId, productId, historyUrl };
        this.props.linkProduct(obj, "box", history);
      }
    }
    // LINK BOX WITH A SHELF SPOT
    else if (type === "linkBoxToSpot") {
      if (type2 !== "shelfSpot") {
        const errorMsg = buildClientMsg({
          info: "Please link the box with a shelf spot",
          color: "red"
        });
        this.props.serverMsg(errorMsg);
        return;
      }
      const shelfSpotId = secondScannedItemId;

      const obj = { shelfSpotId, boxId };

      this.props.linkBox(obj, history);
    }
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
          // Scan Form ---------------------------
          resetItems={this.resetItems}
          linkScannedItems={this.linkScannedItems}
          firstScannedItemId={this.state.firstScannedItemId}
          firstScannedItemType={this.state.firstScannedItemType}
          secondScannedItemId={this.state.secondScannedItemId}
          secondScannedItemType={this.state.secondScannedItemType}
          handleScan={this.handleScan}
          // manual link -----------------------
          storageIdsEntity={this.props.storageIdsEntity}
          storageId={this.state.storageId}
          rackId={this.state.rackId}
          shelfId={this.state.shelfId}
          shelfSpotId={this.state.shelfSpotId}
          boxId={this.state.boxId}
          handleSelectChange={this.handleSelectChange}
          handleLink={this.handleLink}
          // linkProductToBox
          orphans={this.props.orphans}
          handleLinkProductToBox={this.handleLinkProductToBox}
          history={this.props.history}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ ui, storage, product }) => ({
  loading: ui.loading,
  storageIdsEntity: storage.storageIdsEntity,
  orphans: product.products
});

export default connect(
  mapStateToProps,
  { serverMsg, getStorageIds, linkProduct, linkBox, startGetProducts }
)(withRouter(LinkFromBox));
