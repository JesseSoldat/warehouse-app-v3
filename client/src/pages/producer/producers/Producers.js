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
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
import { startGetProducers } from "../../../actions/producer";

class Producers extends Component {
  // lifecycle --------------------------------------
  componentDidMount() {
    this.getProducers();
  }

  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg(msg, options, serverMsg);
    // update this page to be the FROM route
    changeRoute("/producers/search");
  }

  // api calls --------------------------------------
  getProducers = () => {
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
  { serverMsg, changeRoute, startGetProducers }
)(Producers);
