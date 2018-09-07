import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import Heading from "../../../components/Heading";
import IconBtn from "../../../components/buttons/IconBtn";
// custom components
import BoxForm from "./components/BoxForm";
// utils
import getUrlParameter from "../../../utils/getUrlParameter";
// actions
import { startGetRack } from "../../../actions/storage";
import {
  startGetBox,
  startEditBox,
  startDeleteBox
} from "../../../actions/box";
import { serverMsg } from "../../../actions/ui";
// helpers
import buildClientMsg from "../../../actions/helpers/buildClientMsg";

class BoxEdit extends Component {
  state = {
    historyUrl: "",
    location: true,
    boxId: "",
    ids: {}
  };

  // lifecycle -----------------------------------
  componentDidMount() {
    this.getFormData();
  }

  // store / api call -------------------------------
  getFormData() {
    const { match, rack, box } = this.props;
    const { storageId, rackId, shelfId, shelfSpotId, boxId } = match.params;
    // box only logic
    let location = getUrlParameter("location");
    location = location === "false" ? false : true;

    const ids = { storageId, rackId, shelfId, shelfSpotId, boxId };

    let historyUrl;

    if (location) {
      historyUrl = `/shelfSpot/${storageId}/${rackId}/${shelfId}/${shelfSpotId}?type=shelfSpot`;
    } else {
      historyUrl = `/storages`;
    }

    this.setState({ historyUrl, location, boxId, ids });

    // Type is Box and No Location -----------------------
    if (!location) {
      this.props.startGetBox(boxId);
    }

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
  handleSubmit = boxLabel => {
    const { startEditBox, history } = this.props;
    const { boxId, ids } = this.state;
    startEditBox({ boxLabel }, boxId, ids, history);
  };

  sendServerMsg = () => {
    const msg = buildClientMsg({
      info: "Delete or relink all products of this box first.",
      color: "red",
      code: "hide-3"
    });
    this.props.serverMsg(msg);
  };

  handleDelete = () => {
    const { startDeleteBox, rack, box, history } = this.props;
    const { historyUrl, location, boxId, ids } = this.state;

    // No Location ---------------------------------
    if (box && location === false) {
      const { storedItems } = box;
      if (storedItems.length === 0) {
        startDeleteBox(boxId, historyUrl, history);
      } else {
        this.sendServerMsg();
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
        startDeleteBox(boxId, historyUrl, history);
      } else {
        this.sendServerMsg();
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
    // props
    const { loading, rack, box } = this.props;
    const { location, boxId, ids } = this.state;
    const { storageId, shelfId, shelfSpotId } = ids;

    let content, button;

    if (loading) {
      content = <Spinner />;
    }

    // BOX HAS LOCATION
    else if (rack && location === true) {
      const shelf = rack.shelves.find(({ _id }) => _id === shelfId);
      const shelfSpot = shelf.shelfSpots.find(({ _id }) => _id === shelfSpotId);
      const box = shelfSpot.storedItems.find(
        storedItem => storedItem.item._id === boxId
      );

      const contentObj = this.renderContent(box.item.boxLabel);
      content = contentObj.content;
      button = contentObj.button;
    }

    // BOX NO LOCATION
    else if (box && location === false) {
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
    startGetRack,
    startGetBox,
    startEditBox,
    startDeleteBox
  }
)(BoxEdit);
