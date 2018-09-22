import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import CardList from "../../../components/cards/CardList";
// helpers
import producerCardData from "./helpers/producerCardData";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { sendServerMsg, startLoading } from "../../../actions/ui";
import { startGetProducers } from "../../../actions/producer";

class Producers extends Component {
  // lifecycle --------------------------------------
  componentDidMount() {
    this.getProducers();
  }

  componentWillUnmount() {
    const { msg, sendServerMsg } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg({ msg, sendServerMsg, from: "producersClearMsg" });
  }

  // api calls --------------------------------------
  getProducers = () => {
    const { producers } = this.props;

    // Load from the STORE
    if (producers.length > 0) {
      return;
    }
    // Load from the API
    this.props.startLoading({ from: "producersLoading" });
    this.props.startGetProducers();
  };

  render() {
    const { loading, producers } = this.props;
    let content;

    if (loading) {
      content = <Spinner />;
    } else if (!producers || !producers.length) {
    } else {
      content = (
        <CardList data={producerCardData(producers)} cardType="basic" />
      );
    }

    return (
      <div className="container">
        <Message cb={this.getProducers} />
        <Heading title="Producers" />
        <div style={{ height: "30px" }} />
        {content}
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
  { sendServerMsg, startLoading, startGetProducers }
)(Producers);
