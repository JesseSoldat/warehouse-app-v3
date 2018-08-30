import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import TopRowBtns from "../../../components/TopRowBtns";
import SingleFieldList from "../../../components/SingleFieldList";
// helpers
import producerListData from "./helpers/producerListData";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { serverMsg } from "../../../actions/ui";
import {
  startGetProducers,
  startDeleteProducer
} from "../../../actions/producer";

class Producer extends Component {
  // lifecycle --------------------------------------
  componentDidMount() {
    this.getProducers();
  }

  componentWillUnmount() {
    const { msg, options, serverMsg } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg(msg, options, serverMsg);
  }

  // api calls ----------------------------------------
  getProducers = () => {
    const { producerEntity, match, startGetProducers } = this.props;
    const { producerId } = match.params;

    // producerEntity = null to start with
    if (producerEntity) {
      const producer = producerEntity[producerId];
      if (producer && producer._id === producerId) {
        return;
      }
    }

    startGetProducers();
  };

  // events -----------------------------------------
  onDeleteProduct = () => {
    const { startDeleteProducer, match, history } = this.props;
    const { producerId } = match.params;
    // api call
    startDeleteProducer(producerId, history);
  };

  onEdit = () => {
    const { match, history } = this.props;
    const { producerId } = match.params;
    history.push(`/producers/edit/${producerId}`);
  };

  render() {
    // props
    const { loading, producerEntity, match } = this.props;
    const { producerId } = match.params;

    let producer, content;

    if (producerEntity) {
      producer = producerEntity[producerId];
    }

    if (loading) {
      content = <Spinner />;
    } else if (producer) {
      content = <SingleFieldList data={producerListData(producer)} />;
    }

    return (
      <div className="container">
        <Message cb={this.getProducers} />
        {producer && (
          <TopRowBtns
            btn1Cb={this.onDeleteProduct}
            btn2Cb={this.onEdit}
            showRightBtns={true}
          />
        )}
        <Heading title="Producer Details" />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, producer }) => ({
  msg: ui.msg,
  options: ui.options,
  loading: ui.loading,
  producerEntity: producer.producerEntity
});

export default connect(
  mapStateToProps,
  { startGetProducers, startDeleteProducer, serverMsg }
)(Producer);
