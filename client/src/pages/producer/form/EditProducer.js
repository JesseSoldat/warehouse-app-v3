import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// common components
import Heading from "../../../components/Heading";
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
// custom components
import ProducerForm from "./components/ProducerForm";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import {
  sendServerMsg,
  startLoading,
  startShowOverlay
} from "../../../actions/ui";
import {
  startGetProducers,
  startEditProducer
} from "../../../actions/producer";

class EditProducer extends Component {
  // Lifecycles ----------------------------------------------
  componentDidMount() {
    this.getProducers();
  }

  componentWillUnmount() {
    const { msg, sendServerMsg } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg({ msg, sendServerMsg, from: "editProducerClearMsg" });
  }

  // Api Calls ------------------------------------------
  getProducers = () => {
    const { producerEntity, match, startGetProducers } = this.props;
    const { producerId } = match.params;

    // Load from the STORE
    if (producerEntity) {
      const producer = producerEntity[producerId];
      if (producer._id === producerId) {
        return;
      }
    }

    // Load from the API
    this.props.startLoading({ from: "producersEditLoading" });
    startGetProducers();
  };

  // Events and Cbs ---------------------------------------------
  handleSubmit = formData => {
    const { producerId } = this.props.match.params;
    // Api Calls
    this.props.startShowOverlay({ from: "producersEditOverlayUpdate" });
    this.props.startEditProducer(producerId, formData, this.props.history);
  };

  // Render ----------------------------------
  render() {
    const { loading, producerEntity, match } = this.props;
    const { producerId } = match.params;

    let producer, content;

    if (producerEntity) {
      producer = producerEntity[producerId];
    }

    if (loading) {
      content = <Spinner />;
    } else if (producer) {
      content = (
        <ProducerForm handleSubmit={this.handleSubmit} data={producer} />
      );
    }

    return (
      <div className="container">
        <Message cb={this.getProducers} />
        <Heading title="Edit Producer" />
        <div className="row">
          <div className="col-xs-12 col-md-8 mx-auto">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui, producer }) => ({
  msg: ui.msg,
  loading: ui.loading,
  producerEntity: producer.producerEntity
});

export default connect(
  mapStateToProps,
  {
    sendServerMsg,
    startShowOverlay,
    startLoading,
    startGetProducers,
    startEditProducer
  }
)(withRouter(EditProducer));
