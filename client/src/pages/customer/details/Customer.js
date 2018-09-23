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
import { serverMsg, startLoading, showOverlay } from "../../../actions/ui";
import {
  startGetCustomers,
  startDeleteCustomer
} from "../../../actions/customer";

class Customer extends Component {
  // Lifecycles ----------------------------------
  componentDidMount() {
    this.getCustomer();
  }

  componentWillUnmount() {
    const { msg, serverMsg } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg({ msg, serverMsg, from: "customerDetailsClearMsg" });
  }

  // Api Calls ----------------------------
  getCustomer = () => {
    const { customerEntity, match } = this.props;
    const { customerId } = match.params;

    // Load from the STORE
    if (customerEntity) {
      const customer = customerEntity[customerId];
      if (customer && customer._id === customerId) {
        return;
      }
    }

    // Load from the API
    this.props.startLoading({ from: "customerDetailsLoading" });
    this.props.startGetCustomers();
  };

  // Events and Cbs -----------------------------
  onDeleteCustomer = () => {
    const { startDeleteCustomer, match, history } = this.props;
    const { customerId } = match.params;
    // api call
    this.props.showOverlay({ from: "customersShowOverlayDelete" });
    startDeleteCustomer(customerId, history);
  };

  onEditCustomer = () => {
    const { match, history } = this.props;
    const { customerId } = match.params;
    history.push(`/customers/edit/${customerId}`);
  };

  // Render ------------------------------
  render() {
    const { loading, customerEntity, match } = this.props;
    const { customerId } = match.params;

    let customer, content;

    if (customerEntity) {
      customer = customerEntity[customerId];
    }

    if (loading) {
      content = <Spinner />;
    } else if (customer) {
      content = (
        <SingleFieldList
          data={customerListData(customer)}
          listCss="col-md-12"
        />
      );
    }

    return (
      <div className="container">
        <Message cb={this.getCustomer} />
        {customer && (
          <TopRowBtns
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
  loading: ui.loading,
  customerEntity: customer.customerEntity
});

export default connect(
  mapStateToProps,
  {
    serverMsg,
    showOverlay,
    startLoading,
    startGetCustomers,
    startDeleteCustomer
  }
)(Customer);
