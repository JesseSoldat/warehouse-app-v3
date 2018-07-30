import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import TopRowBtns from "../../../components/TopRowBtns";
import SingleFieldList from "../../../components/SingleFieldList";
// helpers
import customerListData from "./helpers/customerListData";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
import {
  startGetCustomer,
  startDeleteCustomer
} from "../../../actions/customer";

class Customer extends Component {
  state = {
    bt1Disable: false,
    bt2Disable: false
  };

  componentDidMount() {
    this.getCustomer();
  }

  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg(msg, options, serverMsg);
    // update this page to be the FROM route
    changeRoute("/customers/:customerId");
  }

  // api calls ----------------------------
  getCustomer = () => {
    const { customerId } = this.props.match.params;
    this.props.startGetCustomer(customerId);
  };

  // events -------------------------------
  onDeleteCustomer = () => {
    // don't let the user click more than once
    this.setState({ bt1Disable: true });
    const { startDeleteCustomer, match, history } = this.props;
    const { customerId } = match.params;
    // api call
    startDeleteCustomer(customerId, history);
  };

  onEditCustomer = () => {
    const { match, history } = this.props;
    const { customerId } = match.params;
    history.push(`/customers/edit/${customerId}`);
  };

  render() {
    // props
    const { loading, customer } = this.props;
    // state
    const { bt1Disable, bt2Disable } = this.state;
    let content;

    if (loading) {
      content = <Spinner />;
    } else if (!customer) {
      content = <Spinner />;
    } else {
      content = <SingleFieldList data={customerListData(customer)} />;
    }

    return (
      <div className="container">
        <Message cb={this.getCustomer} />
        {customer && (
          <TopRowBtns
            bt1Disable={bt1Disable}
            bt2Disable={bt2Disable}
            btn1Cb={this.onDeleteCustomer}
            btn2Cb={this.onEditCustomer}
            showRightBtns={true}
          />
        )}
        <Heading title="Customer Details" />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, customer }) => ({
  msg: ui.msg,
  options: ui.options,
  loading: ui.loading,
  customer: customer.customer
});

export default connect(
  mapStateToProps,
  { serverMsg, changeRoute, startGetCustomer, startDeleteCustomer }
)(Customer);
