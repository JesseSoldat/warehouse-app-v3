import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
// custom components
import TableContainer from "./components/TableContainer";
// utils
import capitalizeFirstLetter from "../../../utils/stringManipulation/capitalizeFirstLetter";
import getUrlParameter from "../../../utils/getUrlParameter";
// actions
import { startGetStorage, startGetRack } from "../../../actions/storage";
import { serverMsg } from "../../../actions/ui";

class Storage extends Component {
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

    this.getStorage();
  }

  // Api calls ----------------------------
  getStorage = () => {
    const { match, rack, startGetRack } = this.props;

    const rackId = match.params.rackId;

    if (rack && rack._id === rackId) return;

    startGetRack(rackId);
  };

  render() {
    // props
    const { loading, rack, match } = this.props;
    const { rackId } = match.params;
    const { shelfId } = match.params;
    const { shelfSpotId } = match.params;

    // params
    const storageType = getUrlParameter("type");

    const heading = storageType === "shelfSpot" ? "Shelf Spot" : storageType;

    let content;

    if (loading) {
      content = <Spinner />;
    }

    // if the store rack id is not the same are the URL rack id
    // wait until the data is fetched and the store gets the correct rack
    else if (rack && rack._id === rackId) {
      content = (
        <TableContainer
          rack={rack}
          storageType={storageType}
          shelfId={shelfId}
          shelfSpotId={shelfSpotId}
        />
      );
    }

    return (
      <div className="container">
        <Message cb={this.getStorage} />
        <Heading title={`${capitalizeFirstLetter(heading)} Details`} />
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
  loading: ui.loading
});

export default connect(
  mapStateToProps,
  { serverMsg, startGetStorage, startGetRack }
)(Storage);
