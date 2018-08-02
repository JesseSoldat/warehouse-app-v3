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
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
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
    const { msg, options, serverMsg, changeRoute } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg(msg, options, serverMsg);
    // update this page to be the FROM route
    changeRoute("/producers/edit/:producerId");
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

  goBack = () => {
    const { from, history, match } = this.props;
    const { producerId } = match.params;
    // user route reducer FROM property to navigate back
    switch (from) {
      case "/producers":
        history.push("/producers");
        return;

      case "/producers/:producerId":
        history.push(`/producers/${producerId}`);
        return;

      default:
        history.push("/producers");
        break;
    }
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
    } else if (!producer) {
    } else {
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

const mapStateToProps = ({ ui, router, producer }) => ({
  msg: ui.msg,
  options: ui.options,
  loading: ui.loading,
  from: router.from,
  producerEntity: producer.producerEntity
});

export default connect(
  mapStateToProps,
  { serverMsg, changeRoute, startGetProducers, startEditProducer }
)(withRouter(EditProducer));
