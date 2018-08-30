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
import { serverMsg } from "../../../actions/ui";
import {
  startGetProducers,
  startCreateProducer
} from "../../../actions/producer";

class CreateProducer extends Component {
  // lifecycle ----------------------------------------------
  componentDidMount() {
    if (this.props.producers.length === 0) {
      this.props.startGetProducers();
    }
  }

  componentWillUnmount() {
    const { msg, options, serverMsg } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg(msg, options, serverMsg);
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
    } else if (data) {
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

const mapStateToProps = ({ ui, producer }) => ({
  msg: ui.msg,
  options: ui.options,
  loading: ui.loading,
  producers: producer.producers
});

export default connect(
  mapStateToProps,
  { serverMsg, startGetProducers, startCreateProducer }
)(withRouter(CreateProducer));
