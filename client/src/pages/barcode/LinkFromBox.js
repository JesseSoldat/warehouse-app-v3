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

  // MANUAL LINK ----------------------------------------------------
  handleSelectChange = obj => {
    this.setState({ ...obj });
  };

  handleLink = e => {
    e.preventDefault();

    const linkObj = {
      apiUrl: this.state.apiUrl,
      boxId: this.props.match.params,
      shelfSpotId: this.state.shelfSpotId
    };

    this.props.linkBox(linkObj, this.props.history);
  };

  handleLinkProductToBox = productId => {
    const linkObj = {
      apiUrl: "/api/link/productToBox",
      historyUrl: this.state.historyUrl,
      boxId: this.state.boxId,
      productId,
      info: "link product to box"
    };
    this.props.linkProduct(linkObj, this.props.history);
  };

  // SCANNED LINK ----------------------------------------------
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

  linkScannedItems = e => {
    e.preventDefault();
    const { secondScannedItemId, type, location } = this.state;

    if (!this.state.boxId || !secondScannedItemId) return;

    const type2 = this.state.secondScannedItemType;

    if (type === "linkProductToBox") {
      // LINK BOX WITH A PRODUCT
      if (type2 !== "product") {
        const errorMsg = buildClientMsg({
          info: "Please link the box with a product",
          color: "red"
        });
        return this.props.serverMsg(errorMsg);
      }

      if (location) {
        const linkObj = {
          historyUrl: this.state.historyUrl,
          apiUrl: "/api/link/productToBox",
          info: "product to box",
          productId: secondScannedItemId,
          boxId: this.state.boxId
        };

        this.props.linkProduct(linkObj, this.props.history);
      }
    }
    // LINK BOX WITH A SHELF SPOT
    else if (type === "linkBoxToSpot") {
      if (type2 !== "shelfSpot") {
        const errorMsg = buildClientMsg({
          info: "Please link the box with a shelf spot",
          color: "red"
        });
        return this.props.serverMsg(errorMsg);
      }

      const linkObj = {
        apiUrl: "/api/link/boxToShelfSpot",
        info: "box to shelf spot",
        shelfSpotId: secondScannedItemId,
        boxId: this.state.boxId
      };

      this.props.linkBox(linkObj, this.props.history);
    }
  };

  // Toggle Camera -----------------------------------------------
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
