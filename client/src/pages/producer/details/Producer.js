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
import { sendServerMsg, startLoading } from "../../../actions/ui";
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
    const { msg, sendServerMsg } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg({ msg, sendServerMsg, from: "producerDetailsClearMsg" });
  }

  // api calls ----------------------------------------
  getProducers = () => {
    const { producerEntity, match, startGetProducers } = this.props;
    const { producerId } = match.params;

    // Load from the STORE
    if (producerEntity) {
      const producer = producerEntity[producerId];
      if (producer && producer._id === producerId) {
        return;
      }
    }
    // Load from the API
    this.props.startLoading({ from: "producerDetailsLoading" });
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
      content = (
        <SingleFieldList
          data={producerListData(producer)}
          listCss="col-md-12"
        />
      );
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
  loading: ui.loading,
  producerEntity: producer.producerEntity
});

export default connect(
  mapStateToProps,
  { startGetProducers, startDeleteProducer, sendServerMsg, startLoading }
)(Producer);
