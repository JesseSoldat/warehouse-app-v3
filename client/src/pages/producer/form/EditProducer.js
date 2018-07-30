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
import { startGetProducer, startEditProducer } from "../../../actions/producer";

class EditProducer extends Component {
  // lifecycle ----------------------------------------------
  componentDidMount() {
    this.getProducer();
  }

  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg(msg, options, serverMsg);
    // update this page to be the FROM route
    changeRoute("/producers/edit/:producerId");
  }

  // api calls ------------------------------------------
  getProducer = () => {
    const { producerId } = this.props.match.params;
    this.props.startGetProducer(producerId);
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
    const { loading, producer } = this.props;
    let content;

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
        <Message cb={this.getProducer} />
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
  producer: producer.producer
});

export default connect(
  mapStateToProps,
  { serverMsg, changeRoute, startGetProducer, startEditProducer }
)(withRouter(EditProducer));
