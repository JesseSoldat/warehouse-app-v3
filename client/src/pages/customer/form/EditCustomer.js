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
import {
  sendServerMsg,
  startLoading,
  startShowOverlay
} from "../../../actions/ui";
import {
  startGetCustomers,
  startEditCustomer
} from "../../../actions/customer";

class EditCustomer extends Component {
  // Lifecycles --------------------------------------
  componentDidMount() {
    this.getCustomer();
  }

  componentWillUnmount() {
    const { msg, sendServerMsg } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg({ msg, sendServerMsg, from: "editCustomerClearMsg" });
  }

  // Api Calls ----------------------------------
  getCustomer = () => {
    const { customerEntity, match } = this.props;
    const { customerId } = match.params;

    // Load from the STORE
    if (customerEntity) {
      const customer = customerEntity[customerId];
      if (customer._id === customerId) {
        return;
      }
    }

    // Load from the API
    this.props.startLoading({ from: "customerEditLoading" });
    this.props.startGetCustomers();
  };

  // Events and Cbs ------------------------------------
  handleSubmit = formData => {
    const { customerId } = this.props.match.params;
    // Api Calls
    this.props.startShowOverlay({ from: "customerEditOverlayUpdate" });
    this.props.startEditCustomer(customerId, formData, this.props.history);
  };

  // Render -------------------------------------------
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

const mapStateToProps = ({ ui, customer }) => ({
  msg: ui.msg,
  loading: ui.loading,
  customerEntity: customer.customerEntity
});

export default connect(
  mapStateToProps,
  {
    sendServerMsg,
    startLoading,
    startShowOverlay,
    startGetCustomers,
    startEditCustomer
  }
)(withRouter(EditCustomer));
