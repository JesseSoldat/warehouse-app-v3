import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import CardList from "../../../components/cards/CardList";
// helpers
import customerCardData from "./helpers/customerCardData";
// actions
import { serverMsg, startLoading } from "../../../actions/ui";
import { startGetCustomers } from "../../../actions/customer";

class Customers extends Component {
  // Lifecycles -------------------------------------
  componentDidMount() {
    this.getCustomers();
  }

  componentWillUnmount() {
    const { msg, serverMsg } = this.props;
    if (msg.color === "danger") serverMsg(null, "customersClearMsg");
  }

  // Store / Api Calls ----------------------------
  getCustomers = () => {
    const { customers } = this.props;

    // Load from the Store
    if (customers.length > 0) {
      return;
    }

    // Load from the Api
    this.props.startLoading({ from: "customersLoading" });
    this.props.startGetCustomers();
  };

  // Render -------------------------------------------
  render() {
    const { loading, customers } = this.props;
    let content;

    if (loading) {
      content = <Spinner />;
    } else {
      content = (
        <CardList data={customerCardData(customers)} cardType="basic" />
      );
    }
    return (
      <div className="container">
        <Message cb={this.getCustomers} />
        <Heading title="Customers" />
        <div style={{ height: "30px" }} />
        {content}
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
  { serverMsg, startLoading, startGetCustomers }
)(Customers);
