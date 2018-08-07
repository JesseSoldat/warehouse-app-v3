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
import { startCreateStorage } from "../../../actions/storage";

class StorageCreate extends Component {
  // api calls ------------------
  handleSubmit = form => {
    const { match, history, startCreateStorage } = this.props;
    const { storageId, rackId, shelfId } = match.params;
    const ids = { storageId, rackId, shelfId };

    const type = getUrlParameter("type");
    let id;

    switch (type) {
      case "storage":
        id = "";
      case "rack":
        id = storageId;
        break;
      case "shelf":
        id = rackId;
        break;
      case "shelfSpot":
        id = shelfId;
        break;
      case "box":
        id = "";
        break;

      default:
        break;
    }

    startCreateStorage(form, type, id, ids, history);
  };

  render() {
    const { loading } = this.props;

    const type = getUrlParameter("type");

    const defaultState = {
      storageLabel: "",
      description: "",
      rackLabel: "",
      shelfLabel: "",
      shelfSpotLabel: "",
      boxLabel: ""
    };

    let content;

    if (loading) {
      content = <Spinner />;
    } else {
      content = (
        <div className="row">
          <StorageForm
            storageType={type}
            formType="create"
            handleSubmit={this.handleSubmit}
            defaultState={defaultState}
            msg={this.props.msg}
          />
        </div>
      );
    }

    return (
      <div className="container">
        <Message />
        <Heading title={`Create ${type}`} />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui }) => ({
  loading: ui.loading,
  msg: ui.msg
});

export default connect(
  mapStateToProps,
  { startCreateStorage }
)(StorageCreate);
