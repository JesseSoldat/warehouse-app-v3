import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// common components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
// custom components
import CustomerForm from "./components/CustomerForm";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
import { startCreateCustomer } from "../../../actions/customer";

class CreateCustomer extends Component {
  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg(msg, options, serverMsg);
    // update this page to be the FROM route
    changeRoute("/customers/create");
  }

  // events ---------------------------------
  handleSubmit = formData => {
    const { history, startCreateCustomer } = this.props;
    // api call
    startCreateCustomer(formData, history);
  };

  render() {
    // create default state data for child component
    const data = {
      customerName: "",
      customerContact: "",
      customerAddress: ""
    };

    let content;

    if (this.props.loading) {
      content = <Spinner />;
    } else {
      content = <CustomerForm handleSubmit={this.handleSubmit} data={data} />;
    }

    return (
      <div className="container">
        <Message />
        <Heading title="Create Customer" />
        <div className="row">
          <div className="col-xs-12 col-md-8 m-auto">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui }) => ({
  msg: ui.msg,
  options: ui.options,
  loading: ui.loading
});

export default connect(
  mapStateToProps,
  { serverMsg, changeRoute, startCreateCustomer }
)(withRouter(CreateCustomer));
