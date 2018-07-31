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
import {
  startGetCustomers,
  startEditCustomer
} from "../../../actions/customer";

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
    const { customerEntity, match } = this.props;
    const { customerId } = match.params;

    if (customerEntity) {
      const customer = customerEntity[customerId];
      if (customer._id === customerId) {
        return;
      }
    }

    this.props.startGetCustomers();
  };

  // events ------------------------------------
  handleSubmit = formData => {
    const { customerId } = this.props.match.params;
    // api call
    this.props.startEditCustomer(customerId, formData, this.props.history);
  };

  render() {
    // props
    const { loading, customerEntity, match } = this.props;
    const { customerId } = match.params;

    let customer, content;

    if (customerEntity) {
      customer = customerEntity[customerId];
    }

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
  customerEntity: customer.customerEntity
});

export default connect(
  mapStateToProps,
  { serverMsg, changeRoute, startGetCustomers, startEditCustomer }
)(withRouter(EditCustomer));
