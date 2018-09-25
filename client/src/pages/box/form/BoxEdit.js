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
import {
  boxLoaded,
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
    historyUrl: null,
    boxId: null,
    ids: null
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

  // Store / Api Calls -------------------------------
  getFormData() {
    const { match, box, boxes } = this.props;
    const { storageId, rackId, shelfId, shelfSpotId, boxId } = match.params;
    const ids = { storageId, rackId, shelfId, shelfSpotId, boxId };

    // No Location
    let historyUrl = "/boxes/search";

    // Has Location
    if (shelfSpotId)
      historyUrl = `/shelfSpot/${storageId}/${rackId}/${shelfId}/${shelfSpotId}?type=shelfSpot`;

    this.setState({ historyUrl, boxId, ids });

    // Check for Box in the Store
    if (box && box._id === boxId) return;

    let boxFromBoxes;
    // Check for Box in Boxes in the Store
    if (boxes && boxes.length > 0) {
      boxFromBoxes = boxes.find(box => box._id === boxId);
    }

    if (boxFromBoxes) {
      return this.props.boxLoaded({ box: boxFromBoxes });
    }

    // Api Calls
    this.props.startLoading({ from: "boxLoadingBox" });
    this.props.startGetBox(boxId);
  }

  // Events Cbs ---------------------------------------------
  handleSubmit = boxLabel => {
    const { startEditBox, history } = this.props;
    const { boxId, ids } = this.state;
    // Api Call
    this.props.showOverlay({ from: "boxEditShowOverlay" });
    startEditBox({ boxLabel }, boxId, ids, history);
  };

  handleDelete = () => {
    const { startDeleteBox, box, history } = this.props;
    const { historyUrl, boxId, ids } = this.state;

    if (box.storedItems.length !== 0) return this.createServerMsg();

    // Api Call
    this.props.showOverlay({
      from: "boxEditShowOverlayDeleteNoLocation"
    });
    startDeleteBox(boxId, historyUrl, ids.shelfSpotId, history);
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
    const { loading, box } = this.props;

    let content, button;

    if (loading) {
      content = <Spinner />;
    } else if (box) {
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

const mapStateToProps = ({ ui, box }) => ({
  msg: ui.msg,
  loading: ui.loading,
  box: box.box,
  boxes: box.boxes
});

export default connect(
  mapStateToProps,
  {
    serverMsg,
    startLoading,
    showOverlay,
    boxLoaded,
    startGetBox,
    startEditBox,
    startDeleteBox
  }
)(BoxEdit);
