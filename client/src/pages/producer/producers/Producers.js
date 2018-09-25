import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// common components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import CardList from "../../../components/cards/CardList";
// helpers
import producerCardData from "./helpers/producerCardData";
// actions
import { serverMsg, startLoading } from "../../../actions/ui";
import { startGetProducers } from "../../../actions/producer";

class Producers extends Component {
  // Lifecycles --------------------------------------
  componentDidMount() {
    this.getProducers();
  }

  componentWillUnmount() {
    const { msg, serverMsg } = this.props;
    if (msg && msg.color === "danger") serverMsg(null, "producersClearMsg");
  }

  // Api Calls --------------------------------------
  getProducers = () => {
    const { producers } = this.props;

    // Load from the STORE
    if (producers.length > 0) return;

    // Load from the API
    this.props.startLoading({ from: "producersLoading" });
    this.props.startGetProducers();
  };

  // Render ---------------------------------------
  render() {
    const { loading, producers } = this.props;
    let content;

    if (loading) {
      content = <Spinner />;
    } else if (!loading && !producers.length) {
      content = (
        <div className="row">
          <div className="col-12 text-center">
            <h3 className="mt-3 mb-3">No producers found.</h3>
            <Link to="/producers/create">
              <h4>Create One?</h4>
            </Link>
          </div>
        </div>
      );
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
  loading: ui.loading,
  producers: producer.producers
});

export default connect(
  mapStateToProps,
  { serverMsg, startLoading, startGetProducers }
)(Producers);
