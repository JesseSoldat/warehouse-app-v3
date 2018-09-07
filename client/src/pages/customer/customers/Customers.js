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
import { serverMsg } from "../../../actions/ui";
import { startGetCustomers } from "../../../actions/customer";

class Customers extends Component {
  componentDidMount() {
    this.getCustomers();
  }

  componentWillUnmount() {
    const { msg, options, serverMsg } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg(msg, options, serverMsg);
  }

  // api calls ----------------------------
  getCustomers = () => {
    const { customers } = this.props;

    if (customers.length > 0) {
      return;
    }

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
  options: ui.options,
  loading: ui.loading,
  customers: customer.customers
});

export default connect(
  mapStateToProps,
  { serverMsg, startGetCustomers }
)(Customers);
