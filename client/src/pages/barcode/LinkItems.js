import React, { Component, Fragment } from "react";
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

class LinkItems extends Component {
  state = {
    // scan
    type: "",
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
    shelfSpotId: ""
  };

  // lifecycles --------------------------------------------
  componentDidMount() {
    this.getStorageEntityIds();
  }

  // MANUAL LINK ----------------------------------------
  getStorageEntityIds = () => {
    const { storageIdsEntity } = this.props;
    const type = getUrlParameter("type");

    // type is "" when clicking Navbar Scan link
    if (type) {
      this.setState({ type, showTabs: true });
    } else {
      this.setState({ showScan: true });
    }

    if (!storageIdsEntity) {
      this.props.getStorageIds();
    }
  };

  handleSelectChange = obj => {
    // console.log(obj);
    this.setState({ ...obj });
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

  render() {
    return (
      <div className="container">
        <Message />
        <Heading title="Link Item" />

        {this.state.showScan && (
          <BarcodeScan
            result={this.state.result}
            scanning={this.state.scanning}
            handleClickUseCamera={this.handleClickUseCamera}
            handleErr={this.handleErr}
            handleScan={this.handleScan}
          />
        )}

        {this.state.showTabs && (
          <Tabs
            // manual link
            loading={this.props.loading}
            storageIdsEntity={this.props.storageIdsEntity}
            storageId={this.state.storageId}
            rackId={this.state.rackId}
            shelfId={this.state.shelfId}
            shelfSpotId={this.state.shelfSpotId}
            handleSelectChange={this.handleSelectChange}
            // scan
            result={this.state.result}
            scanning={this.state.scanning}
            handleClickUseCamera={this.handleClickUseCamera}
            handleErr={this.handleErr}
            handleScan={this.handleScan}
          />
        )}
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
  { getStorageIds }
)(LinkItems);
