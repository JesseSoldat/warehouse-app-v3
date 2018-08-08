import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import Heading from "../../../components/Heading";
// custom components
import StorageForm from "./components/StorageForm";
// utils
import getUrlParameter from "../../../utils/getUrlParameter";
// actions
import {
  startGetStorages,
  startGetRack,
  startEditStorage,
  startDeleteStorage
} from "../../../actions/storage";

class StorageEdit extends Component {
  state = { type: "", id: "", ids: {} };

  // lifecycle -----------------------------------
  componentDidMount() {
    this.getFormData();
  }

  // store / api call -------------------------------
  getFormData() {
    const type = getUrlParameter("type");
    const { match, storages, rack } = this.props;
    const { storageId, rackId, shelfId, shelfSpotId, boxId } = match.params;

    const ids = { storageId, rackId, shelfId, shelfSpotId, boxId };

    switch (type) {
      case "storage":
        this.setState({ type, id: storageId, ids });
        break;

      case "rack":
        this.setState({ type, id: rackId, ids });
        break;

      case "shelf":
        this.setState({ type, id: shelfId, ids });
        break;

      case "shelfSpot":
        this.setState({ type, id: shelfSpotId, ids });
        break;

      case "box":
        this.setState({ type, id: boxId, ids });
        break;

      default:
        break;
    }

    // Type is storage -----------------------------------
    if (type === "storage") {
      // Check store first for storages in the STORE
      if (storages.length === 0) {
        // fetch storages from API
        this.props.startGetStorages();
      }
    }
    // Type is either rack, shelf, shelfSpot -------------
    // Rack is present in the STORE
    else if (rack) {
      // Fetch Rack from Store || API call
      if (rack._id !== rackId) {
        this.props.startGetRack(rackId);
        return;
      }
    }
    // Rack is null in the Store / do API call
    else {
      this.props.startGetRack(rackId);
    }
  }
  // cb ---------------------------------------------
  handleSubmit = form => {
    const { startEditStorage, history } = this.props;
    const { type, id, ids } = this.state;
    startEditStorage(form, type, id, ids, history);
  };

  handleDelete = () => {
    const { startDeleteStorage, history } = this.props;
    const { type, id, ids } = this.state;
    startDeleteStorage(type, id, ids, history);
  };

  renderContent = (type, defaultState) => {
    const button = (
      <div className="row">
        <div className="col-xs-12 col-sm-10 col-md-8 mx-auto  d-flex justify-content-end">
          <button className="btn btn-danger mt-4" onClick={this.handleDelete}>
            <i className="far fa-trash-alt mr-2" /> Delete
          </button>
        </div>
      </div>
    );

    const content = (
      <StorageForm
        storageType={type}
        formType="edit"
        handleSubmit={this.handleSubmit}
        defaultState={defaultState}
        msg={this.props.msg}
      />
    );

    return { content, button };
  };

  render() {
    // props
    const { loading, storages, rack } = this.props;
    const { type, ids } = this.state;
    const { storageId, shelfId, shelfSpotId, boxId } = ids;

    let storage, content, button;

    const title = type === "shelfSpot" ? "Shelf Spot" : type;

    const defaultState = {
      storageLabel: "",
      description: "",
      rackLabel: "",
      shelfLabel: "",
      spotLabel: "",
      boxLabel: ""
    };

    if (loading) {
      content = <Spinner />;
    }

    // Type is Storage
    else if (storages.length > 0 && type === "storage") {
      storage = storages.find(({ _id }) => _id === storageId);

      defaultState.storageLabel = storage.storageLabel;
      defaultState.description = storage.description;

      const contentObj = this.renderContent(type, defaultState);
      content = contentObj.content;
      button = contentObj.button;
    }
    // Type is Rack
    else if (rack && type === "rack") {
      defaultState.rackLabel = rack.rackLabel;

      const contentObj = this.renderContent(type, defaultState);
      content = contentObj.content;
      button = contentObj.button;
    }
    // Type is Shelf
    else if (rack && type === "shelf") {
      const shelf = rack.shelves.find(({ _id }) => _id === shelfId);

      defaultState.shelfLabel = shelf.shelfLabel;

      const contentObj = this.renderContent(type, defaultState);

      content = contentObj.content;
      button = contentObj.button;
    }
    // Type is Shelf Spot
    else if (rack && type === "shelfSpot") {
      const shelf = rack.shelves.find(({ _id }) => _id === shelfId);

      const shelfSpot = shelf.shelfSpots.find(({ _id }) => _id === shelfSpotId);

      defaultState.shelfSpotLabel = shelfSpot.shelfSpotLabel;

      const contentObj = this.renderContent(type, defaultState);

      content = contentObj.content;
      button = contentObj.button;
    } else if (rack && type === "box") {
      const shelf = rack.shelves.find(({ _id }) => _id === shelfId);
      const shelfSpot = shelf.shelfSpots.find(({ _id }) => _id === shelfSpotId);
      const box = shelfSpot.storedItems.find(
        storedItem => storedItem.item._id === boxId
      );
      console.log("box");
      console.log(box.item);

      defaultState.boxLabel = box.item.boxLabel;

      const contentObj = this.renderContent(type, defaultState);
      content = contentObj.content;
      button = contentObj.button;
    }

    return (
      <div className="container">
        <Message />
        {button}
        <Heading title={title} />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, storage }) => ({
  msg: ui.msg,
  loading: ui.loading,
  storages: storage.storages,
  rack: storage.rack
});

export default connect(
  mapStateToProps,
  { startGetStorages, startGetRack, startEditStorage, startDeleteStorage }
)(StorageEdit);
