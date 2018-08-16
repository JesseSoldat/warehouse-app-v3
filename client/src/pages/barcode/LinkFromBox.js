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
      if (location) {
        const { storageId, rackId, shelfId, shelfSpotId } = match.params;
        historyUrl = `/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=box`;
      }

      this.setState({
        title: "Link Product to Box",
        boxId,
        type,
        historyUrl,
        location
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
        location: false
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
      // linkProductToBox
      orphans={this.props.orphans}
      handleLinkProductToBox={this.handleLinkProductToBox}
      history={this.props.history}
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
  orphans: product.products
});

export default connect(
  mapStateToProps,
  { getStorageIds, linkProduct, linkBox, startGetProducts }
)(withRouter(LinkFromBox));
