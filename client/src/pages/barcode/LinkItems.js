import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// custom components
import BarcodeScan from "./components/BarcodeScan";
import Tabs from "./components/Tabs";
// common components
import Message from "../../components/Message";
import Heading from "../../components/Heading";
import Spinner from "../../components/Spinner";
// utils
import getUrlParameter from "../../utils/getUrlParameter";
// actions
import { getStorageIds } from "../../actions/storage";
import { startGetProduct } from "../../actions/product";

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
    const { storageIdsEntity, product, match } = this.props;
    const { productId, boxId } = match.params;
    const type = getUrlParameter("type");

    // navigated from product details page
    switch (type) {
      // PRODUCT -----------------------------------
      // Product Details -> Scan
      // put product on shelf OR in box
      case "product":
        if (product && product._id === productId) {
          console.log(product);
        } else {
          // fetch the product here picture / name
          this.props.startGetProduct(productId);
        }
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
          title: "Link Product to Box",
          boxId,
          type,
          showTabs: true
        });
        break;
      // BOX -------------------------------------------
      // Box Details -> Scan
      case "linkBoxToSpot":
        this.setState({
          title: "Link Box to Shelf Spot",
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
    console.log("type", this.state.type);
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
      result={this.state.result}
      scanning={this.state.scanning}
      handleClickUseCamera={this.handleClickUseCamera}
      handleErr={this.handleErr}
      handleScan={this.handleScan}
      // from product details
      product={this.props.product}
      // from box
      boxId={this.state.boxId}
    />
  );

  renderTabsContent = () => (
    <Tabs
      // manual link
      loading={this.props.loading}
      type={this.state.type}
      storageIdsEntity={this.props.storageIdsEntity}
      storageId={this.state.storageId}
      rackId={this.state.rackId}
      shelfId={this.state.shelfId}
      shelfSpotId={this.state.shelfSpotId}
      handleSelectChange={this.handleSelectChange}
      handleLink={this.handleLink}
      // scan
      result={this.state.result}
      scanning={this.state.scanning}
      handleClickUseCamera={this.handleClickUseCamera}
      handleErr={this.handleErr}
      handleScan={this.handleScan}
      // from product details
      product={this.props.product}
      // from box
      boxId={this.state.boxId}
    />
  );

  render() {
    const { type, productId } = this.state;
    const { loading, product } = this.props;

    let content;

    if (loading) {
      content = <Spinner />;
    } else if (type === "product") {
      // need to wait for the product to arrive from the backend
      if (product && product._id === productId) {
        // we have the data we need
        content = this.renderTabsContent();
      }
    } else if (type === "linkProductToBox") {
      // don't need single product
      // need to fetch orphans
      content = this.renderTabsContent();
    } else if (type === "linkBoxToSpot") {
      // just need the boxId No API call
      content = this.renderTabsContent();
    }
    // Navigated from the Scan Link on the NavBar
    else if (this.state.showScan) {
      content = this.renderScanContent();
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
  product: product.product
});

export default connect(
  mapStateToProps,
  { getStorageIds, startGetProduct }
)(LinkItems);
