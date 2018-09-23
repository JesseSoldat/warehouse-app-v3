import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// common components
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import Heading from "../../../components/Heading";
// custom components
import StoragesTable from "./components/StoragesTable";
// actions
import { startGetStorages } from "../../../actions/storage";
import { startLoading } from "../../../actions/ui";

class Storages extends Component {
  // lifecycles ----------------------------------------------
  componentDidMount() {
    this.getStorages();
  }

  // STORE / API CALLS ----------------------------
  getStorages = () => {
    const { storages, startGetStorages, startLoading } = this.props;

    // Load from the API
    if (storages && storages.length === 0) {
      startLoading({ from: "storagesLoadingStorages" });
      startGetStorages();
    }
  };

  render() {
    const { loading, storages } = this.props;

    let content, button;

    if (loading) {
      content = <Spinner />;
    } else if (storages.length === 0 && !loading) {
      button = (
        <div className="row">
          <div className="col-12">
            <h4>No Storages created yet.</h4>
            <hr />
            <br />
            <Link to="/storage/create?type=storage">
              <button className="btn btn-default ml-4">
                <i className="fas fa-plus-circle mr-2" />
                Create New Storage
              </button>
            </Link>
          </div>
        </div>
      );
    }
    // have storages
    else if (storages && storages.length > 0) {
      button = (
        <div className="row">
          <Link to="/storage/create?type=storage">
            <button className="btn btn-default ml-4">
              <i className="fas fa-plus-circle mr-2" />
              Create New Storage
            </button>
          </Link>
        </div>
      );
      content = (
        <div className="row">
          {storages.map((storage, i) => (
            <StoragesTable key={i} storage={storage} storageId={storage._id} />
          ))}
        </div>
      );
    }

    return (
      <div className="container">
        <Message cb={this.getStorages} />
        <Heading title="Storages" />
        {button}
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, storage }) => ({
  loading: ui.loading,
  storages: storage.storages
});

export default connect(
  mapStateToProps,
  { startGetStorages, startLoading }
)(Storages);
