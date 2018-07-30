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

    // when creating a storage it will not need an id
    let id = match.params.id === "storage" ? "" : match.params.id;

    const type = getUrlParameter("type");

    startCreateStorage(form, type, id, history);
  };

  render() {
    const { loading } = this.props;

    const type = getUrlParameter("type");

    const defaultState = {
      storageLabel: "",
      description: "",
      rackLabel: "",
      shelfLabel: "",
      spotLabel: "",
      boxLabel: ""
    };

    let content;

    if (loading) {
      let content = <Spinner />;
    } else {
      content = (
        <div className="row">
          <StorageForm
            storageType={type}
            formType="create"
            handleSubmit={this.handleSubmit}
            defaultState={defaultState}
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
  loading: ui.loading
});

export default connect(
  mapStateToProps,
  { startCreateStorage }
)(StorageCreate);
