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
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
import {
  startGetProducers,
  startDeleteProducer
} from "../../../actions/producer";

class Producer extends Component {
  state = {
    bt1Disable: false,
    bt2Disable: false
  };

  // lifecycle --------------------------------------
  componentDidMount() {
    this.getProducers();
  }

  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg(msg, options, serverMsg);
    // update this page to be the FROM route
    changeRoute("/producers/:producerId");
  }

  // api calls ----------------------------------------
  getProducers = () => {
    const { producers } = this.props;

    if (producers.length > 0) return;

    this.props.startGetProducers();
  };

  // events -----------------------------------------
  onDeleteProduct = () => {
    this.setState({ bt1Disable: true });
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
    const { loading, producers } = this.props;
    // state
    const { bt1Disable, bt2Disable } = this.state;
    let content;

    if (loading) {
      content = <Spinner />;
    } else if (!producers || !producers.length) {
    } else {
      content = <SingleFieldList data={producerListData(producers)} />;
    }

    return (
      <div className="container">
        <Message cb={this.getProducers} />
        {producers && (
          <TopRowBtns
            bt1Disable={bt1Disable}
            bt2Disable={bt2Disable}
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
  producers: producer.producers
});

export default connect(
  mapStateToProps,
  { startGetProducers, startDeleteProducer, serverMsg, changeRoute }
)(Producer);
