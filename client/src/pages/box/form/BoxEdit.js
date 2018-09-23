import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import Heading from "../../../components/Heading";
import IconBtn from "../../../components/buttons/IconBtn";
// custom components
import BoxForm from "./components/BoxForm";
// actions
import { startGetRack } from "../../../actions/storage";
import {
  startGetBox,
  startEditBox,
  startDeleteBox
} from "../../../actions/box";
import { serverMsg, startLoading, showOverlay } from "../../../actions/ui";
// helpers
import buildClientMsg from "../../../actions/helpers/buildClientMsg";

class BoxEdit extends Component {
  // State ------------------------------------
  state = {
    historyUrl: "",
    boxId: "",
    ids: {}
  };

  // Lifecycles -----------------------------------
  componentDidMount() {
    this.getFormData();
  }

  // Helper Functions -------------------------------
  createServerMsg = () => {
    const msg = buildClientMsg({
      info: "Delete or relink all products of this box first.",
      color: "red",
      code: "hide-3"
    });
    this.props.serverMsg(msg);
  };

  findBoxInRack = (rack, ids) => {
    const shelf = rack.shelves.find(({ _id }) => _id === ids.shelfId);
    const shelfSpot = shelf.shelfSpots.find(
      ({ _id }) => _id === ids.shelfSpotId
    );
    const box = shelfSpot.storedItems.find(
      storedItem => storedItem.item._id === ids.boxId
    );
    return box;
  };

  // Store / Api Calls -------------------------------
  getFormData() {
    const { match, rack } = this.props;
    const { storageId, rackId, shelfId, shelfSpotId, boxId } = match.params;
    const ids = { storageId, rackId, shelfId, shelfSpotId, boxId };

    let historyUrl = `/storages`;

    if (shelfSpotId)
      historyUrl = `/shelfSpot/${storageId}/${rackId}/${shelfId}/${shelfSpotId}?type=shelfSpot`;

    this.setState({ historyUrl, boxId, ids });

    // Box and No Location -----------------------
    if (!shelfSpotId) {
      // Api Calls
      this.props.startLoading({ from: "boxEditLoadingBox" });
      this.props.startGetBox(boxId);
    }
    // Box with Location -------------------------
    // Rack is NOT present in the STORE or rackId does not match
    else if (!rack || rack._id !== rackId) {
      // Api Calls
      this.props.startLoading({ from: "boxEditLoadingRack" });
      this.props.startGetRack(rackId);
    }
  }

  // DOM cb ---------------------------------------------
  handleSubmit = boxLabel => {
    const { startEditBox, history } = this.props;
    const { boxId, ids } = this.state;
    // Api Call
    this.props.showOverlay({ from: "boxEditShowOverlay" });
    startEditBox({ boxLabel }, boxId, ids, history);
  };

  handleDelete = () => {
    const { startDeleteBox, rack, box, history } = this.props;
    const { historyUrl, boxId, ids } = this.state;

    // No Location ---------------------------------
    if (box && !ids.shelfSpotId) {
      if (box.storedItems.length === 0) {
        // Api Call
        this.props.showOverlay({
          from: "boxEditShowOverlayDeleteNoLocation"
        });
        startDeleteBox(boxId, historyUrl, null, history);
      } else {
        this.createServerMsg();
      }
    }
    // Have Location ---------------------------------
    else {
      const box = this.findBoxInRack(rack, ids);
      const { storedItems } = box.item;

      if (storedItems && storedItems.length === 0) {
        // Api Call
        this.props.showOverlay({
          from: "boxEditShowOverlayDeleteLocation"
        });
        startDeleteBox(boxId, historyUrl, ids.shelfSpotId, history);
      } else {
        this.createServerMsg();
      }
    }
  };

  renderContent = boxLabel => {
    const button = (
      <div className="row">
        <div className="col-xs-12 col-sm-10 col-md-8 mx-auto  d-flex justify-content-end">
          <IconBtn
            btnClass="btn-danger mt-4"
            iconClass="fa-trash-alt mr-1"
            text="Delete"
            cb={this.handleDelete}
          />
        </div>
      </div>
    );

    const content = (
      <BoxForm
        formType="edit"
        handleSubmit={this.handleSubmit}
        boxLabel={boxLabel}
      />
    );

    return { content, button };
  };

  render() {
    const { loading, match, rack, box } = this.props;
    const { storageId, rackId, shelfId, shelfSpotId, boxId } = match.params;
    const ids = { storageId, rackId, shelfId, shelfSpotId, boxId };

    let content, button;

    if (loading) {
      content = <Spinner />;
    }

    // BOX HAS LOCATION
    else if (rack && shelfSpotId) {
      const box = this.findBoxInRack(rack, ids);
      const contentObj = this.renderContent(box.item.boxLabel);
      content = contentObj.content;
      button = contentObj.button;
    }

    // BOX NO LOCATION
    else if (box && !shelfSpotId) {
      const contentObj = this.renderContent(box.boxLabel);
      content = contentObj.content;
      button = contentObj.button;
    }

    return (
      <div className="container">
        <Message />
        {button}
        <Heading title="Edit Box" />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, storage, box }) => ({
  msg: ui.msg,
  loading: ui.loading,
  rack: storage.rack,
  box: box.box
});

export default connect(
  mapStateToProps,
  {
    serverMsg,
    startLoading,
    showOverlay,
    startGetRack,
    startGetBox,
    startEditBox,
    startDeleteBox
  }
)(BoxEdit);
