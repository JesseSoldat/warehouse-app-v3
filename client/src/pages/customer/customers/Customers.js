import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import CardList from "../../../components/CardList";
// helpers
import customerCardData from "./helpers/customerCardData";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
import { startGetCustomers } from "../../../actions/customer";

class Customers extends Component {
  componentDidMount() {
    this.getCustomers();
  }

  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg(msg, options, serverMsg);
    // update this page to be the FROM route
    changeRoute("/customers/search");
  }

  // api calls ----------------------------
  getCustomers = () => {
    this.props.startGetCustomers();
  };

  render() {
    const { loading, customers } = this.props;
    let content;

    if (loading) {
      content = <Spinner />;
    } else {
      content = <CardList data={customerCardData(customers)} />;
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
  { serverMsg, changeRoute, startGetCustomers }
)(Customers);
