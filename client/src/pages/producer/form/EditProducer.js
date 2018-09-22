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
import { sendServerMsg } from "../../../actions/ui";
import {
  startGetProducers,
  startEditProducer
} from "../../../actions/producer";

class EditProducer extends Component {
  // lifecycle ----------------------------------------------
  componentDidMount() {
    this.getProducers();
  }

  componentWillUnmount() {
    const { msg, sendServerMsg } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg({ msg, sendServerMsg, from: "editProducerClearMsg" });
  }

  // api calls ------------------------------------------
  getProducers = () => {
    const { producerEntity, match, startGetProducers } = this.props;
    const { producerId } = match.params;

    if (producerEntity) {
      const producer = producerEntity[producerId];
      if (producer._id === producerId) {
        return;
      }
    }

    startGetProducers();
  };

  // events ---------------------------------------------
  handleSubmit = formData => {
    const { producerId } = this.props.match.params;
    // api call
    this.props.startEditProducer(producerId, formData, this.props.history);
  };

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
  { sendServerMsg, startGetProducers, startEditProducer }
)(withRouter(EditProducer));
