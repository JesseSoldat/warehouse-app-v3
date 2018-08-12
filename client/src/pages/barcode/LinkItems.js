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

class LinkItems extends Component {
  state = {
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
        this.setState({
          title: "Link Product",
          productId,
          type,
          showTabs: true
        });
        break;
      // PRODUCT - BOX -------------------------------------------
      // Box Details -> Scan
      case "linkProductToBox":
        // fetch orphans to put in the box
        this.setState({
          title: "Link Product",
          boxId,
          type,
          showTabs: true
        });
        break;
      // BOX -------------------------------------------
      // Box Details -> Scan
      case "linkBoxToSpot":
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

    if (!storageIdsEntity) {
      this.props.getStorageIds();
    }
  };

  handleSelectChange = obj => {
    this.setState({ ...obj });
  };

  handleLink = e => {
    e.preventDefault();

    switch (this.state.type) {
      case "product":
      case "linkProductToBox":
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
    />
  );

  render() {
    const { type } = this.state;
    const { loading } = this.props;

    let content;

    switch (type) {
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

const mapStateToProps = ({ ui, storage }) => ({
  loading: ui.loading,
  storageIdsEntity: storage.storageIdsEntity
});

export default connect(
  mapStateToProps,
  { getStorageIds, linkProduct, linkBox }
)(withRouter(LinkItems));
