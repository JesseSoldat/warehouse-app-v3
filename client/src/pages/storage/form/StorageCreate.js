import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
// custom components
import StorageForm from "./components/StorageForm";
// utils
import getUrlParameter from "../../../utils/getUrlParameter";
// actions
import { startCreateStorage } from "../../../actions/storage";

class StorageCreate extends Component {
  // api calls ------------------
  handleSubmit = form => {
    const { match, history, startCreateStorage } = this.props;
    const { storageId, rackId, shelfId, shelfSpotId } = match.params;
    const ids = { storageId, rackId, shelfId, shelfSpotId };

    const type = getUrlParameter("type");
    let id;

    switch (type) {
      case "storage":
        id = "";
        break;
      case "rack":
        id = storageId;
        break;
      case "shelf":
        id = rackId;
        break;
      case "shelfSpot":
        id = shelfId;
        break;

      default:
        break;
    }

    startCreateStorage(form, type, id, ids, history);
  };

  render() {
    const type = getUrlParameter("type");

    const defaultState = {
      storageLabel: "",
      description: "",
      rackLabel: "",
      shelfLabel: "",
      shelfSpotLabel: ""
    };

    return (
      <div className="container">
        <Message />
        <Heading title={`Create ${type}`} />
        <div className="row">
          <StorageForm
            storageType={type}
            formType="create"
            handleSubmit={this.handleSubmit}
            defaultState={defaultState}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { startCreateStorage }
)(StorageCreate);
