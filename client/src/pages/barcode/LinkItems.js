import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// custom components
import BarcodeScan from "./components/BarcodeScan";
import Tabs from "./components/Tabs";
// common components
import Message from "../../components/Message";
import Heading from "../../components/Heading";
// utils
import getUrlParameter from "../../utils/getUrlParameter";
// actions
import { getStorageIds } from "../../actions/storage";
import { linkProduct, linkBox } from "../../actions/link";
import { startGetProducts } from "../../actions/product";

class LinkItems extends Component {
  state = {
    location: false,
    historyUrl: "",
    // scan
    type: "",
    title: "",
    showScan: false,
    showTabs: false,
    scanning: false,
    result: ["Scanning, no results so far..."],
    pastScannedItemId: "",
    pastScannedItemType: "",
    // manual link
    storageId: "",
    rackId: "",
    shelfId: "",
    shelfSpotId: "",
    // scan && manual link
    boxId: "",
    productId: ""
  };

  // lifecycles --------------------------------------------
  componentDidMount() {
    this.apiData();
  }

  // MANUAL LINK ----------------------------------------
  apiData = () => {
    const { storageIdsEntity, match } = this.props;
    const { productId, boxId } = match.params;
    const type = getUrlParameter("type");
    let location = getUrlParameter("location");
    location = location === "true" ? true : false;

    switch (type) {
      // From PRODUCT DETAILS -----------------------------------
      // put product on shelf OR in box
      case "product":
        if (!storageIdsEntity) {
          this.props.getStorageIds();
        }
        this.setState({
          title: "Link Product",
          productId,
          type,
          showTabs: true,
          historyUrl: `/products/${productId}`,
          location
        });
        break;
      // From BOX DETAILS -----------------------------------------
      // put product in box
      case "linkProductToBox":
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
        if (location) {
          const { storageId, rackId, shelfId, shelfSpotId } = match.params;
          historyUrl = `/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=box`;
        }

        this.setState({
          title: "Link Product",
          boxId,
          type,
          showTabs: true,
          historyUrl,
          location
        });
        break;
      // From BOX DETAILS -----------------------------------------
      // link box to shelfSpot
      case "linkBoxToSpot":
        if (!storageIdsEntity) {
          this.props.getStorageIds();
        }

        this.setState({
          title: "Link Box",
          boxId,
          type,
          showTabs: true,
          location: false
        });
        break;
      // From NAVBAR SCAN LINK
      // no TYPE param or LOCATION param
      default:
        this.setState({ showScan: true });
        break;
    }
  };

  handleSelectChange = obj => {
    this.setState({ ...obj });
  };

  handleLink = e => {
    e.preventDefault();
    const { type, location } = this.state;

    switch (type) {
      case "product":
        // store in a box or on a shelf spot
        const productTo = this.state.boxId ? "box" : "shelfSpot";
        if (location) {
          // relink the product to a new location
        } else {
          // store a product that has not yet be stored
          this.props.linkProduct(this.state, productTo, this.props.history);
        }
        break;

      case "linkBoxToSpot":
        const { boxId } = this.props.match.params;
        this.props.linkBox(this.state, boxId, this.props.history);
        break;

      default:
        break;
    }
  };

  // From Box adding Products ---------------------------
  handleLinkProductToBox = productId => {
    const obj = { boxId: this.state.boxId, productId };
    this.props.linkProduct(obj, "box", this.props.history);
  };

  // BARCODE ----------------------------------------------
  handleErr = err => {
    console.log(err);
  };

  handleSuccess = () => {};

  handleScan = data => {
    if (data) {
      // console.log(data);

      this.setState({
        result: data
      });
    }
  };

  handleClickUseCamera = () => {
    this.setState(({ scanning }) => ({ scanning: !scanning }));
  };

  // Render Content ------------------------------------
  renderScanContent = () => (
    <BarcodeScan
      type={this.state.type}
      result={this.state.result}
      scanning={this.state.scanning}
      handleClickUseCamera={this.handleClickUseCamera}
      handleErr={this.handleErr}
      handleScan={this.handleScan}
    />
  );

  renderTabsContent = () => (
    <Tabs
      // both -----------------------------
      type={this.state.type}
      loading={this.props.loading}
      // manual link -----------------------
      storageIdsEntity={this.props.storageIdsEntity}
      storageId={this.state.storageId}
      rackId={this.state.rackId}
      shelfId={this.state.shelfId}
      shelfSpotId={this.state.shelfSpotId}
      boxId={this.state.boxId}
      handleSelectChange={this.handleSelectChange}
      handleLink={this.handleLink}
      // scan --------------------------------
      result={this.state.result}
      scanning={this.state.scanning}
      handleClickUseCamera={this.handleClickUseCamera}
      handleErr={this.handleErr}
      handleScan={this.handleScan}
      // linkProductToBox
      orphans={this.props.orphans}
      handleLinkProductToBox={this.handleLinkProductToBox}
      history={this.props.history}
    />
  );

  render() {
    let content;

    switch (this.state.type) {
      case "product":
      case "linkProductToBox":
      case "linkBoxToSpot":
        content = this.renderTabsContent();
        break;

      default:
        content = this.renderScanContent();
        break;
    }

    return (
      <div className="container">
        <Message />
        <Heading title={this.state.title} />
        {content}
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
  { getStorageIds, linkProduct, linkBox, startGetProducts }
)(withRouter(LinkItems));
