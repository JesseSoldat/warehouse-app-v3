import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// common components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
// custom components
import BoxTable from "./components/BoxTable";
// actions
import { serverMsg, startLoading } from "../../../actions/ui";
import { startGetRack } from "../../../actions/storage";
import { startGetBox } from "../../../actions/box";
import { unlinkBox } from "../../../actions/unlink";

class Box extends Component {
  // lifecyles -----------------------------
  componentDidMount() {
    this.getBox();
  }

  componentWillUpdate() {
    if (!this.props.rack || !this.props.box) this.getBox();
  }

  // Api calls ----------------------------
  getBox = () => {
    const { match, rack, box } = this.props;

    // -------------- Box has NO location ----------------
    if (match.path === "/box/:boxId") {
      const { boxId } = match.params;
      // check for box in the store
      if (box && box._id === boxId) return;
      this.props.startLoading({ from: "boxLoadingBox" });
      this.props.startGetBox(boxId);
    }
    // ----------------- Box has a Location ----------------
    else {
      const { rackId } = match.params;

      if (rack && rack._id === rackId) return;
      this.props.startLoading({ from: "boxLoadingRack" });
      this.props.startGetRack(rackId);
    }
  };

  // CB
  removeFromShelfSpot = () => {
    const { match, history } = this.props;
    const { shelfSpotId, boxId } = match.params;
    this.props.unlinkBox({ shelfSpotId, boxId }, history);
  };

  render() {
    // props
    const { loading, rack, box, match } = this.props;
    const { storageId, rackId, shelfId, shelfSpotId, boxId } = match.params;
    const ids = { storageId, rackId, shelfId, shelfSpotId, boxId };

    let content;

    if (loading) {
      content = <Spinner />;
    }
    // NO location
    else if (match.path === "/box/:boxId") {
      // Box is in the STORE
      if (box && box._id === boxId) {
        content = (
          <BoxTable
            items={box.storedItems}
            boxLabel={box.boxLabel}
            boxId={boxId}
            location={false}
          />
        );
      }
    }
    // have location
    else if (match.path !== "/box/:boxId") {
      if (rack && rack._id === rackId) {
        content = (
          <BoxTable
            ids={ids}
            rack={rack}
            location={true}
            removeFromShelfSpot={this.removeFromShelfSpot}
          />
        );
      }
    }

    return (
      <div className="container">
        <Message />
        <Heading title="Box Details" />
        <div className="col-12 d-flex justify-content-around flex-wrap mt-4">
          {content}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui, storage, box }) => ({
  msg: ui.msg,
  rack: storage.rack,
  box: box.box,
  loading: ui.loading
});

export default connect(
  mapStateToProps,
  { unlinkBox, serverMsg, startLoading, startGetRack, startGetBox }
)(withRouter(Box));
