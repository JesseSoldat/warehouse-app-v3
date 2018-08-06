import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import Heading from "../../../components/Heading";
// custom components
import StoragesTable from "./components/StoragesTable";
// actions
import { startGetStorages } from "../../../actions/storage";

class Details extends Component {
  componentDidMount() {
    // each time the route changes this will be called with a different TYPE
    this.getStorages();
  }

  // Api calls ----------------------------
  getStorages = () => {
    const { storages, startGetStorages } = this.props;

    // check if the store has a copy of storages
    if (storages && storages.length === 0) {
      return startGetStorages();
    }
  };

  render() {
    const { match, loading, storages } = this.props;
    const storageId = match.params.storageId;

    let content;

    if (loading) {
      content = <Spinner />;
    } else if (!loading && storages.length < 1) {
    } else {
      const storage = storages.find(storage => storage._id === storageId);

      content = (
        <div className="row">
          <StoragesTable
            storage={storage}
            type="details"
            storageId={storageId}
          />
        </div>
      );
    }

    return (
      <div className="container">
        <Message cb={this.getStorages} />
        <Heading title="Storage Details" />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, storage }) => ({
  storages: storage.storages,
  loading: ui.loading
});

export default connect(
  mapStateToProps,
  { startGetStorages }
)(Details);
