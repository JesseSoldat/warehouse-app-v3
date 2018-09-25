import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
// custom components
import BoxTable from "./components/BoxTable";
// actions
import { serverMsg, startLoading, showOverlay } from "../../../actions/ui";
import { startGetBox, boxLoaded } from "../../../actions/box";
import { unlinkBox } from "../../../actions/unlink";

class Box extends Component {
  // Lifecycles -----------------------------
  componentDidMount() {
    this.getBox();
  }

  componentWillUpdate() {
    this.getBox();
  }

  // Api calls ----------------------------
  getBox = () => {
    const { match, box, boxes } = this.props;
    const { boxId } = match.params;

    // Check for Box in the Store
    if (box && box._id === boxId) return;

    let boxFromBoxes;
    // Check for Box in Boxes in the Store
    if (boxes && boxes.length > 0) {
      boxFromBoxes = boxes.find(box => box._id === boxId);
    }

    if (boxFromBoxes) {
      return this.props.boxLoaded({ box: boxFromBoxes });
    }
    // Api Calls
    this.props.startLoading({ from: "boxLoadingBox" });
    this.props.startGetBox(boxId);
  };

  // Events and Cbs ---------------------------------------
  removeFromShelfSpot = () => {
    const { match, history } = this.props;
    const { shelfSpotId, boxId } = match.params;

    // Api Calls
    this.props.showOverlay({ from: "boxShowOverlayRemove" });
    this.props.unlinkBox({ shelfSpotId, boxId }, history);
  };

  // Render ---------------------------------------
  render() {
    // props
    const { loading, box, match } = this.props;
    const { storageId, rackId, shelfId, shelfSpotId, boxId } = match.params;
    const ids = { storageId, rackId, shelfId, shelfSpotId, boxId };

    let content;

    if (loading) {
      content = <Spinner />;
    } else if (box && box._id === boxId) {
      content = (
        <BoxTable
          box={box}
          // used when box has a location
          ids={ids}
          removeFromShelfSpot={this.removeFromShelfSpot}
        />
      );
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

const mapStateToProps = ({ ui, box }) => ({
  msg: ui.msg,
  box: box.box,
  boxes: box.boxes,
  loading: ui.loading
});

export default connect(
  mapStateToProps,
  {
    unlinkBox,
    boxLoaded,
    serverMsg,
    showOverlay,
    startLoading,
    startGetBox
  }
)(Box);
