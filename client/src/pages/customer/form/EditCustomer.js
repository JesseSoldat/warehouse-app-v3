import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// common components
import Heading from "../../../components/Heading";
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
// custom components
import CustomerForm from "./components/CustomerForm";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
import { startGetCustomer, startEditCustomer } from "../../../actions/customer";

class EditCustomer extends Component {
  // lifecycle --------------------------------------
  componentDidMount() {
    this.getCustomer();
  }

  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg(msg, options, serverMsg);
    // update this page to be the FROM route
    changeRoute("/customers/edit/:customerId");
  }

  // api calls ----------------------------------
  getCustomer = () => {
    const { customerId } = this.props.match.params;
    this.props.startGetCustomer(customerId);
  };

  // events ------------------------------------
  handleSubmit = formData => {
    const { customerId } = this.props.match.params;
    // api call
    this.props.startEditCustomer(customerId, formData, this.props.history);
  };

  render() {
    const { loading, customer } = this.props;
    let content;

    if (loading) {
      content = <Spinner />;
    } else if (!customer) {
    } else {
      content = (
        <CustomerForm handleSubmit={this.handleSubmit} data={customer} />
      );
    }

    return (
      <div className="container">
        <Message cb={this.getCustomer} />
        <Heading title="Edit Customer" />
        <div className="row">
          <div className="col-xs-12 col-md-8 mx-auto">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui, router, customer }) => ({
  msg: ui.msg,
  options: ui.options,
  loading: ui.loading,
  from: router.from,
  customer: customer.customer
});

export default connect(
  mapStateToProps,
  { serverMsg, changeRoute, startGetCustomer, startEditCustomer }
)(withRouter(EditCustomer));
