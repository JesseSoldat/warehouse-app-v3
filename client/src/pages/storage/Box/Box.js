import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
// custom components
import BoxTable from "./components/BoxTable";
// actions
import { serverMsg } from "../../../actions/ui";
import { startGetRack, startGetBox } from "../../../actions/storage";

class Box extends Component {
  // lifecyles -----------------------------
  componentDidMount() {
    // Redirect to details after saving or updating a storage
    const { msg } = this.props;

    // hide the success message after 3 seconds
    if (msg && msg.code === "hide-3") {
      window.scrollTo(0, 0);
      setTimeout(() => {
        this.props.serverMsg(null);
      }, 3000);
    }

    this.getBox();
  }

  // Api calls ----------------------------
  getBox = () => {
    const { match, rack, box } = this.props;

    // Box has NO location
    if (match.path === "/box/:boxId") {
      console.log("Box with NO location");

      const { boxId } = match.params;
      // check for box in the store
      if (box && box._id === boxId) {
        return;
      }
      this.props.startGetBox(boxId);
      return;
    }
    // Box has a Location
    else {
      console.log("Box with location");
      const rackId = match.params.rackId;

      if (rack && rack._id === rackId) return;

      this.props.startGetRack(rackId);
    }
  };

  render() {
    // props
    const { loading, rack, box, match } = this.props;
    const { rackId } = match.params;
    const { shelfId } = match.params;
    const { shelfSpotId } = match.params;
    const { boxId } = match.params;

    let content;

    if (loading) {
      content = <Spinner />;
    }
    // NO location
    else if (match.path === "/box/:boxId") {
      // Box is in the STORE
      if (box && box._id === boxId) {
        content = <BoxTable box={box} boxId={boxId} location={false} />;
      }
    }
    // have location
    else if (match.path !== "/box/:boxId") {
      if (rack) {
        content = (
          <BoxTable
            rack={rack}
            shelfId={shelfId}
            shelfSpotId={shelfSpotId}
            boxId={boxId}
            location={true}
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

const mapStateToProps = ({ ui, storage }) => ({
  msg: ui.msg,
  rack: storage.rack,
  box: storage.box,
  loading: ui.loading
});

export default connect(
  mapStateToProps,
  { serverMsg, startGetRack, startGetBox }
)(Box);
