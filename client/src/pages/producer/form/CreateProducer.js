import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// common components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
// custom components
import ProducerForm from "./components/ProducerForm";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
import { startCreateProducer } from "../../../actions/producer";

class CreateProducer extends Component {
  // lifecycle ----------------------------------------------
  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg(msg, options, serverMsg);
    // update this page to be the FROM route
    changeRoute("/producers/create");
  }

  // events -----------------------------------------------
  handleSubmit = formData => {
    const { history, startCreateProducer } = this.props;
    startCreateProducer(formData, history);
  };

  render() {
    const { loading } = this.props;
    // default producer data to use in child component state
    const data = {
      producerName: "",
      producerContact: "",
      producerAddress: ""
    };

    let content;
    if (loading) {
      content = <Spinner />;
    } else {
      content = <ProducerForm handleSubmit={this.handleSubmit} data={data} />;
    }

    return (
      <div className="container">
        <Message />
        <Heading title="Create Producer" />
        <div className="row">
          <div className="col-xs-12 col-md-8 m-auto">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui }) => ({
  msg: ui.msg,
  options: ui.options,
  loading: ui.loading
});

export default connect(
  mapStateToProps,
  { serverMsg, changeRoute, startCreateProducer }
)(withRouter(CreateProducer));
