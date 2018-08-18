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
  startGetBox,
  startEditStorage,
  startDeleteStorage
} from "../../../actions/storage";
import { serverMsg } from "../../../actions/ui";
// helpers
import buildClientMsg from "../../../actions/helpers/buildClientMsg";

class StorageEdit extends Component {
  state = {
    historyUrl: "",
    location: true,
    type: "",
    id: "",
    ids: {}
  };

  // lifecycle -----------------------------------
  componentDidMount() {
    this.getFormData();
  }

  // store / api call -------------------------------
  getFormData() {
    const type = getUrlParameter("type");
    const { match, storages, rack } = this.props;
    const { storageId, rackId, shelfId, shelfSpotId, boxId } = match.params;
    // box only logic
    let location = getUrlParameter("location");
    location = location === "false" ? false : true;

    const ids = { storageId, rackId, shelfId, shelfSpotId, boxId };

    let historyUrl;

    switch (type) {
      case "storage":
        historyUrl = "/storages";
        this.setState({ historyUrl, type, id: storageId, ids });
        break;

      case "rack":
        historyUrl = `/storage/${storageId}`;
        this.setState({ historyUrl, type, id: rackId, ids });
        break;

      case "shelf":
        historyUrl = `/rack/${storageId}/${rackId}?type=rack`;
        this.setState({ historyUrl, type, id: shelfId, ids });
        break;

      case "shelfSpot":
        historyUrl = `/shelf/${storageId}/${rackId}/${shelfId}?type=shelf`;
        this.setState({ historyUrl, type, id: shelfSpotId, ids });
        break;

      case "box":
        if (location) {
          historyUrl = `/shelfSpot/${storageId}/${rackId}/${shelfId}/${shelfSpotId}?type=shelfSpot`;
        } else {
          historyUrl = `/storages`;
        }
        this.setState({ historyUrl, location, type, id: boxId, ids });
        break;

      default:
        break;
    }

    // Type is Box and No Location -----------------------
    if (type === "box" && !location) {
      this.props.startGetBox(boxId);
    }
    // Type is storage -----------------------------------
    else if (type === "storage") {
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
    const { startDeleteStorage, storages, rack, box, history } = this.props;
    const { historyUrl, location, type, id, ids } = this.state;
    let shelf;

    switch (type) {
      case "storage":
        const storage = storages.find(obj => obj._id === id);

        if (storage.racks.length === 0) {
          startDeleteStorage(type, id, historyUrl, history);
        } else {
          const msg = buildClientMsg({
            info: "Delete or relink all racks of this storage first.",
            color: "red",
            code: "hide-3"
          });
          this.props.serverMsg(msg);
        }

        break;

      case "rack":
        const { shelves } = rack;
        if (shelves && shelves.length === 0) {
          startDeleteStorage(type, id, historyUrl, history);
        } else {
          const msg = buildClientMsg({
            info: "Delete or relink all shelves of this rack first.",
            color: "red",
            code: "hide-3"
          });
          this.props.serverMsg(msg);
        }

        break;

      case "shelf":
        shelf = rack.shelves.find(({ _id }) => _id === ids.shelfId);
        const { shelfSpots } = shelf;

        if (shelfSpots && shelfSpots.length === 0) {
          startDeleteStorage(type, id, historyUrl, history);
        } else {
          const msg = buildClientMsg({
            info: "Delete or relink all shelf spots of this shelf first.",
            color: "red",
            code: "hide-3"
          });
          this.props.serverMsg(msg);
        }

        break;

      case "shelfSpot":
        shelf = rack.shelves.find(({ _id }) => _id === ids.shelfId);

        const shelfSpot = shelf.shelfSpots.find(
          ({ _id }) => _id === ids.shelfSpotId
        );

        const { storedItems } = shelfSpot;

        if (storedItems.length === 0) {
          startDeleteStorage(type, id, historyUrl, history);
        } else {
          const msg = buildClientMsg({
            info:
              "Delete or relink all products or boxes of this shelf spot first.",
            color: "red",
            code: "hide-3"
          });
          this.props.serverMsg(msg);
        }

        break;

      case "box":
        // No Location ---------------------------------
        if (box && location === false && type === "box") {
          const { storedItems } = box;
          if (storedItems.length === 0) {
            startDeleteStorage(type, id, historyUrl, history);
          } else {
            const msg = buildClientMsg({
              info: "Delete or relink all products of this box first.",
              color: "red",
              code: "hide-3"
            });
            this.props.serverMsg(msg);
          }
        }
        // Have Location ---------------------------------
        else {
          const shelf = rack.shelves.find(({ _id }) => _id === ids.shelfId);

          const shelfSpot = shelf.shelfSpots.find(
            ({ _id }) => _id === ids.shelfSpotId
          );
          const box = shelfSpot.storedItems.find(
            storedItem => storedItem.item._id === ids.boxId
          );

          const { storedItems } = box.item;

          if (storedItems && storedItems.length === 0) {
            startDeleteStorage(type, id, historyUrl, history);
          } else {
            const msg = buildClientMsg({
              info: "Delete or relink all products of this box first.",
              color: "red",
              code: "hide-3"
            });
            this.props.serverMsg(msg);
          }
        }

        break;

      default:
        break;
    }

    // startDeleteStorage(type, id, ids, history);
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
    const { loading, storages, rack, box } = this.props;
    const { location, type, ids } = this.state;
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
    else if (storages && storages.length > 0 && type === "storage") {
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
    }
    // BOX HAS LOCATION
    else if (rack && type === "box" && location === true) {
      const shelf = rack.shelves.find(({ _id }) => _id === shelfId);
      const shelfSpot = shelf.shelfSpots.find(({ _id }) => _id === shelfSpotId);
      const box = shelfSpot.storedItems.find(
        storedItem => storedItem.item._id === boxId
      );

      defaultState.boxLabel = box.item.boxLabel;

      const contentObj = this.renderContent(type, defaultState);
      content = contentObj.content;
      button = contentObj.button;
    }

    // Type is Box with No Location
    else if (box && location === false && type === "box") {
      defaultState.boxLabel = box.boxLabel;

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
  rack: storage.rack,
  box: storage.box
});

export default connect(
  mapStateToProps,
  {
    serverMsg,
    startGetStorages,
    startGetRack,
    startGetBox,
    startEditStorage,
    startDeleteStorage
  }
)(StorageEdit);
