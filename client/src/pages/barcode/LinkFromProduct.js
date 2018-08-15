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
// actions
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
    result: ["Scanning, no results so far..."],
    pastScannedItemId: "",
    pastScannedItemType: "",
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
      historyUrl: `/products/${productId}`
    });
  };

  // child component CBs ----------------------------------
  handleSelectChange = obj => {
    this.setState({ ...obj, formSubmit: false });
  };

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

  // render DOM elements ----------------------------------
  renderTabsContent = () => (
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
  );

  render() {
    const content = this.renderTabsContent();

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
  product: product.product
});

export default connect(
  mapStateToProps,
  { getStorageIds, startGetProduct, linkProduct, relinkProduct }
)(withRouter(LinkFromProduct));
