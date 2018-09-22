import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import CardList from "../../../components/cards/CardList";
// helpers
import customerCardData from "./helpers/customerCardData";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { sendServerMsg, startLoading } from "../../../actions/ui";
import { startGetCustomers } from "../../../actions/customer";

class Customers extends Component {
  componentDidMount() {
    this.getCustomers();
  }

  componentWillUnmount() {
    const { msg, sendServerMsg } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg({ msg, sendServerMsg, from: "customersClearMsg" });
  }

  // api calls ----------------------------
  getCustomers = () => {
    const { customers } = this.props;

    // Load from the STORE
    if (customers.length > 0) {
      return;
    }

    // Load from the API
    this.props.startLoading({ from: "customersLoading" });
    this.props.startGetCustomers();
  };

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
  { sendServerMsg, startLoading, startGetCustomers }
)(Customers);
