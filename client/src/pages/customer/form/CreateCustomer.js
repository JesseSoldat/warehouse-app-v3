import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// common components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
// custom components
import CustomerForm from "./components/CustomerForm";
// actions
import { serverMsg, startLoading, showOverlay } from "../../../actions/ui";
import {
  startGetCustomers,
  startCreateCustomer
} from "../../../actions/customer";

class CreateCustomer extends Component {
  componentDidMount() {
    this.getCustomers();
  }

  componentWillUnmount() {
    const { msg, serverMsg } = this.props;
    if (msg && msg.color === "danger")
      serverMsg(null, "createCustomerClearMsg");
  }

  // API Calls
  getCustomers() {
    // Load from the STORE
    if (this.props.customers.length > 0) return;

    // Load from the API
    this.props.startLoading({ from: "customerCreateLoading" });
    this.props.startGetCustomers();
  }

  // events ---------------------------------
  handleSubmit = formData => {
    const { history, startCreateCustomer } = this.props;
    // api call
    this.props.showOverlay({ from: "customerCreateOverlay" });
    startCreateCustomer(formData, history);
  };

  // Render ----------------------------------
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

const mapStateToProps = ({ ui, customer }) => ({
  msg: ui.msg,
  loading: ui.loading,
  customers: customer.customers
});

export default connect(
  mapStateToProps,
  {
    serverMsg,
    startLoading,
    showOverlay,
    startGetCustomers,
    startCreateCustomer
  }
)(withRouter(CreateCustomer));
