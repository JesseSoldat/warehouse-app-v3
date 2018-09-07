import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import Heading from "../../../components/Heading";
import IconBtn from "../../../components/buttons/IconBtn";
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
import { serverMsg } from "../../../actions/ui";
// helpers
import buildClientMsg from "../../../actions/helpers/buildClientMsg";

class StorageEdit extends Component {
  state = {
    historyUrl: "",
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
    const { storageId, rackId, shelfId, shelfSpotId } = match.params;
    const ids = { storageId, rackId, shelfId, shelfSpotId };

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

      default:
        break;
    }

    // Type is storage -----------------------------------
    if (type === "storage") {
      // Check store first for storages in the STORE
      if (storages.length === 0) this.props.startGetStorages();
    }
    // Type is either rack, shelf, shelfSpot -------------
    // Rack is present in the STORE
    else if (rack) {
      // Fetch Rack from Store || API call
      if (rack._id !== rackId) this.props.startGetRack(rackId);
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

  createServeMsg = (type1, type2) => {
    const msg = buildClientMsg({
      info: `Delete or relink all ${type1} of this ${type2} first.`,
      color: "red",
      code: "hide-3"
    });
    this.props.serverMsg(msg);
  };

  handleDelete = () => {
    const { startDeleteStorage, storages, rack, history } = this.props;
    const { historyUrl, type, id, ids } = this.state;
    let shelf;

    switch (type) {
      case "storage":
        const storage = storages.find(obj => obj._id === id);

        if (storage.racks.length === 0) {
          return startDeleteStorage(type, id, historyUrl, history);
        }
        this.createServeMsg("racks", "storage");
        break;

      case "rack":
        const { shelves } = rack;
        if (shelves && shelves.length === 0) {
          return startDeleteStorage(type, id, historyUrl, history);
        }
        this.createServeMsg("shelves", "rack");
        break;

      case "shelf":
        shelf = rack.shelves.find(({ _id }) => _id === ids.shelfId);
        const { shelfSpots } = shelf;

        if (shelfSpots && shelfSpots.length === 0) {
          return startDeleteStorage(type, id, historyUrl, history);
        }
        this.createServeMsg("shelf spots", "shelf");
        break;

      case "shelfSpot":
        shelf = rack.shelves.find(({ _id }) => _id === ids.shelfId);

        const shelfSpot = shelf.shelfSpots.find(
          ({ _id }) => _id === ids.shelfSpotId
        );

        const { storedItems } = shelfSpot;

        if (storedItems.length === 0) {
          return startDeleteStorage(type, id, historyUrl, history);
        }
        this.createServeMsg("products or boxes", "shelf spot");
        break;

      default:
        break;
    }
  };

  // render HTML
  renderContent = (type, defaultState) => (
    <StorageForm
      storageType={type}
      formType="edit"
      handleSubmit={this.handleSubmit}
      defaultState={defaultState}
    />
  );

  render() {
    const { loading, storages, rack } = this.props;
    const { type, ids } = this.state;
    const { storageId, shelfId, shelfSpotId } = ids;

    let storage, content;

    const title = type === "shelfSpot" ? "Shelf Spot" : type;

    const defaultState = {
      storageLabel: "",
      description: "",
      rackLabel: "",
      shelfLabel: "",
      spotLabel: ""
    };

    if (loading) {
      content = <Spinner />;
    }

    // Type is Storage
    else if (storages && storages.length > 0 && type === "storage") {
      storage = storages.find(({ _id }) => _id === storageId);

      defaultState.storageLabel = storage.storageLabel;
      defaultState.description = storage.description;
      content = this.renderContent(type, defaultState);
    }
    // Type is Rack
    else if (rack && type === "rack") {
      defaultState.rackLabel = rack.rackLabel;
      content = this.renderContent(type, defaultState);
    }
    // Type is Shelf
    else if (rack && type === "shelf") {
      const shelf = rack.shelves.find(({ _id }) => _id === shelfId);

      defaultState.shelfLabel = shelf.shelfLabel;
      content = this.renderContent(type, defaultState);
    }
    // Type is Shelf Spot
    else if (rack && type === "shelfSpot") {
      const shelf = rack.shelves.find(({ _id }) => _id === shelfId);

      const shelfSpot = shelf.shelfSpots.find(({ _id }) => _id === shelfSpotId);

      defaultState.shelfSpotLabel = shelfSpot.shelfSpotLabel;
      content = this.renderContent(type, defaultState);
    }

    return (
      <div className="container">
        <Message />
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-md-8 mx-auto  d-flex justify-content-end">
            {!loading && (
              <IconBtn
                btnClass="btn-danger mt-4"
                iconClass="fa-trash-alt mr-1"
                text="Delete"
                cb={this.handleDelete}
              />
            )}
          </div>
        </div>
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
  {
    serverMsg,
    startGetStorages,
    startGetRack,
    startEditStorage,
    startDeleteStorage
  }
)(StorageEdit);
