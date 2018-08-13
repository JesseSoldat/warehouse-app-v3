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

    // navigated from product details page
    switch (type) {
      // PRODUCT -----------------------------------
      // Product Details -> Scan
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
          historyUrl: `/products/${productId}`
        });
        break;
      // PRODUCT - BOX -------------------------------------------
      // Box Details -> Scan
      case "linkProductToBox":
        // fetch orphans to put in the box
        this.props.startGetProducts({
          searchType: "orphans",
          skip: 0,
          limit: 100,
          page: 0
        });

        const haveLocation = false;
        let historyUrl = `/box/${boxId}?type=box`;
        if (haveLocation) {
          const { storageId, rackId, shelfId, shelfSpotId } = match.params;
          historyUrl = `/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=box`;
        }

        this.setState({
          title: "Link Product",
          boxId,
          type,
          showTabs: true,
          historyUrl
        });
        break;
      // BOX -------------------------------------------
      // Box Details -> Scan
      case "linkBoxToSpot":
        if (!storageIdsEntity) {
          this.props.getStorageIds();
        }

        this.setState({
          title: "Link Box",
          boxId,
          type,
          showTabs: true
        });
        break;

      default:
        // type is "" when clicking Navbar Scan link
        this.setState({ showScan: true });
        break;
    }
  };

  handleSelectChange = obj => {
    this.setState({ ...obj });
  };

  handleLinkProductToBox = productId => {
    const obj = { boxId: this.state.boxId, productId };
    this.props.linkProduct(obj, "box", this.props.history);
  };

  handleLink = e => {
    e.preventDefault();

    switch (this.state.type) {
      case "product":
        const productTo = this.state.boxId ? "box" : "shelfSpot";
        this.props.linkProduct(this.state, productTo, this.props.history);
        break;

      case "linkBoxToSpot":
        const { boxId } = this.props.match.params;
        this.props.linkBox(this.state, boxId, this.props.history);
        break;

      default:
        break;
    }
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
    if (this.props.orphans.length > 0) console.log(this.props.orphans);

    switch (this.state.type) {
      case "product":
      case "linkProductToBox":
      // need to fetch orphans
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
