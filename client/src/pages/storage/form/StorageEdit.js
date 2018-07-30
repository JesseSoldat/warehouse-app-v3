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
import capitalizeFirstLetter from "../../../utils/stringManipulation/capitalizeFirstLetter";
// actions
import {
  startGetStorage,
  startEditStorage,
  startDeleteStorage
} from "../../../actions/storage";

class StorageEdit extends Component {
  state = { type: "", id: "" };

  // lifecycle -----------------------------------
  componentDidMount() {
    const { match, startGetStorage } = this.props;
    const id = match.params.id;
    const type = getUrlParameter("type");

    startGetStorage(id, type);
  }

  // cb ---------------------------------------------
  handleSubmit = form => {
    const { startEditStorage, match, history } = this.props;
    const id = match.params.id;
    const type = getUrlParameter("type");

    startEditStorage(form, type, id, history);
  };

  handleDelete = () => {
    const { startDeleteStorage, match, history } = this.props;
    const id = match.params.id;
    const type = getUrlParameter("type");
    startDeleteStorage(type, id, history);
  };

  render() {
    const { loading, storage } = this.props;
    const type = getUrlParameter("type");

    const defaultState = {
      storageLabel: "",
      description: "",
      rackLabel: "",
      shelfLabel: "",
      spotLabel: "",
      boxLabel: ""
    };

    let content, button;

    if (loading) {
      content = <Spinner />;
    } else if (storage === null) {
    } else {
      switch (type) {
        case "storage":
          defaultState.storageLabel = storage.storageLabel;
          defaultState.description = storage.description;
          break;

        case "rack":
          defaultState.rackLabel = storage.rackLabel;
          break;

        case "shelf":
          defaultState.shelfLabel = storage.shelfLabel;
          break;

        case "shelfSpot":
          defaultState.spotLabel = storage.spotLabel;
          break;

        case "box":
          defaultState.boxLabel = storage.boxLabel;
          break;

        default:
          break;
      }

      button = (
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-md-8 mx-auto  d-flex justify-content-end">
            <button className="btn btn-danger mt-4" onClick={this.handleDelete}>
              <i className="far fa-trash-alt mr-2" /> Delete{" "}
              {type && capitalizeFirstLetter(type)}
            </button>
          </div>
        </div>
      );

      content = (
        <StorageForm
          storageType={type}
          storage={storage}
          formType="edit"
          handleSubmit={this.handleSubmit}
          defaultState={defaultState}
        />
      );
    }

    const title = type === "shelfSpot" ? "Shelf Spot" : type;

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
  storage: storage.storage
});

export default connect(
  mapStateToProps,
  { startGetStorage, startEditStorage, startDeleteStorage }
)(StorageEdit);
