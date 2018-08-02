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

    if (rack && rack._id === rackId) return;

    startGetRack(rackId);
  };

  render() {
    // props
    const { loading, rack, match } = this.props;
    const rackId = match.params.id;
    // params
    const storageType = getUrlParameter("type");
    const shelfId = getUrlParameter("shelfId");
    const shelfSpotId = getUrlParameter("shelfSpotId");

    const heading = storageType === "shelfSpot" ? "Shelf Spot" : storageType;

    let content;

    if (loading) {
      content = <Spinner />;
    }
    // if the store rack id is not the same are the URL rack id
    // wait until the data is fetched and the store gets the correct rack
    else if (rack && rack._id === rackId) {
      content = (
        <Fragment>
          <TableContainer
            rack={rack}
            storageType={storageType}
            shelfId={shelfId}
            shelfSpotId={shelfSpotId}
          />
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
