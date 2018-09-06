import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// common components
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
// custom components
import BoxForm from "./components/BoxForm";
// actions
import { startCreateBox } from "../../../actions/box";

const BoxCreate = ({ startCreateBox, history }) => {
  // api calls ------------------
  const handleSubmit = boxLabel => {
    startCreateBox({ boxLabel }, history);
  };

  const defaultState = {
    storageLabel: "",
    description: "",
    rackLabel: "",
    shelfLabel: "",
    shelfSpotLabel: "",
    boxLabel: ""
  };

  return (
    <div className="container">
      <Message />
      <Heading title="Create Box" />
      <div className="row">
        <BoxForm
          formType="Create"
          handleSubmit={handleSubmit}
          defaultState={defaultState}
        />
      </div>
    </div>
  );
};

export default connect(
  null,
  { startCreateBox }
)(withRouter(BoxCreate));
