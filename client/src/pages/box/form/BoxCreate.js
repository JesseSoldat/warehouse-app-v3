import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// common components
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
// custom components
import BoxForm from "./components/BoxForm";
// actions
import { startShowOverlay } from "../../../actions/ui";
import { startCreateBox } from "../../../actions/box";

const BoxCreate = ({ startCreateBox, history, match }) => {
  // Api Calls ------------------
  const handleSubmit = boxLabel => {
    const { params } = match;
    // Api Calls
    this.props.startShowOverlay({ from: "boxCreateShowOverlay" });
    startCreateBox({ boxLabel, params }, history);
  };

  return (
    <div className="container">
      <Message />
      <Heading title="Create Box" />
      <div className="row">
        <BoxForm formType="Create" handleSubmit={handleSubmit} boxLabel="" />
      </div>
    </div>
  );
};

export default connect(
  null,
  { startCreateBox, startShowOverlay }
)(withRouter(BoxCreate));
