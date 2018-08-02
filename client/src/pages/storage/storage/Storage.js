import React, { Component, Fragment } from "react";
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

class Storage extends Component {
  // lifecyles -----------------------------
  componentDidMount() {
    this.getStorage();
  }

  // Api calls ----------------------------
  getStorage = () => {
    const { match, rack, startGetRack } = this.props;

    const rackId = match.params.id;

    if (rack && rack._id === rackId) {
      console.log("fetch rack from store");
      return;
    }

    startGetRack(rackId);
  };

  render() {
    const { loading, rack } = this.props;

    const storageType = getUrlParameter("type");

    const heading = storageType === "shelfSpot" ? "Shelf Spot" : storageType;

    let content;

    if (loading) {
      content = <Spinner />;
    } else if (rack) {
      content = (
        <Fragment>
          <TableContainer rack={rack} storageType={storageType} />
        </Fragment>
      );
    }

    return (
      <div className="container">
        <Message cb={this.getStorage} />
        <Heading title={`${capitalizeFirstLetter(heading)} Details`} />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, storage }) => ({
  storage: storage.storage,
  rack: storage.rack,
  loading: ui.loading
});

export default connect(
  mapStateToProps,
  { startGetStorage, startGetRack }
)(Storage);
