import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// common components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
// custom components
import ProducerForm from "./components/ProducerForm";
// actions
import { serverMsg, startLoading, showOverlay } from "../../../actions/ui";
import {
  startGetProducers,
  startCreateProducer
} from "../../../actions/producer";

class CreateProducer extends Component {
  // Lifecycles ----------------------------------------------
  componentDidMount() {
    this.getProducers();
  }

  componentWillUnmount() {
    const { msg, serverMsg } = this.props;
    if (msg && msg.color === "danger")
      serverMsg(null, "createProducerClearMsg");
  }

  // API Calls
  getProducers() {
    // Load from the STORE
    if (this.props.producers.length > 0) return;

    // Load from the API
    this.props.startLoading({ from: "producersCreateLoading" });
    this.props.startGetProducers();
  }

  // Events and Cbs ----------------------------------
  handleSubmit = formData => {
    const { history, startCreateProducer } = this.props;
    // Api Calls
    this.props.showOverlay({ from: "producersCreateOverlay" });
    startCreateProducer(formData, history);
  };

  // Render --------------------------------
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
  loading: ui.loading,
  producers: producer.producers
});

export default connect(
  mapStateToProps,
  {
    serverMsg,
    startLoading,
    showOverlay,
    startGetProducers,
    startCreateProducer
  }
)(withRouter(CreateProducer));
