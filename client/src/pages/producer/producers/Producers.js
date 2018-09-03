import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import CardList from "../../../components/CardList";
// helpers
import producerCardData from "./helpers/producerCardData";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { serverMsg } from "../../../actions/ui";
import { startGetProducers } from "../../../actions/producer";

class Producers extends Component {
  // lifecycle --------------------------------------
  componentDidMount() {
    this.getProducers();
  }

  componentWillUnmount() {
    const { msg, options, serverMsg } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg(msg, options, serverMsg);
  }

  // api calls --------------------------------------
  getProducers = () => {
    const { producers } = this.props;

    if (producers.length > 0) {
      return;
    }

    this.props.startGetProducers();
  };

  render() {
    const { loading, producers } = this.props;
    let content;

    if (loading) {
      content = <Spinner />;
    } else if (!producers || !producers.length) {
    } else {
      content = <CardList data={producerCardData(producers)} />;
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
  { serverMsg, startGetProducers }
)(Producers);
