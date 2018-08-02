import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// common components
import Heading from "../../../components/Heading";
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
// custom components
import ProductForm from "./components/ProductForm";
// helpers
import getInitialState from "./helpers/getInitialState";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
import {
  productLoaded,
  createProduct,
  startGetClients
} from "../../../actions/product";
import { startGetProducers } from "../../../actions/producer";
import { startGetCustomers } from "../../../actions/customer";

class CreateProduct extends Component {
  // lifecycle -----------------------------------------------
  componentDidMount() {
    this.props.productLoaded(null);
    this.getFormData();
  }

  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg(msg, options, serverMsg);
    // update this page to be the FROM route
    changeRoute("/products/create");
  }

  // load api data --------------------------------------------
  getFormData = () => {
    const { customers, producers } = this.props;

    let haveCustomers = false;
    let haveProducers = false;
    // CUSTOMERS ----------------------------------
    if (customers.length > 0) {
      haveCustomers = true;
    }
    // PRODUCERS ----------------------------------
    if (producers.length > 0) {
      haveProducers = true;
    }

    if (haveCustomers && haveProducers) {
      console.log("Have Product, Customers, Producers");
    } else if (!haveCustomers && !haveProducers) {
      console.log("NO Clients");

      this.props.startGetClients();
    } else if (!haveCustomers && haveProducers) {
      console.log("Have Producer NO Customers");

      this.props.startGetCustomers();
    } else if (haveCustomers && !haveProducers) {
      console.log("Have Customers NO Producer");

      this.props.startGetProducers();
    }
  };

  // events handle cb ----------------------------------------
  handleSubmit = form => {
    this.props.createProduct(form, this.props.history);
  };

  handleSendMsg = msg => {
    this.props.serverMsg(msg);
  };

  render() {
    const { msg, loading, customers, producers } = this.props;
    let content;

    // set product defaults to child component's state
    const productObj = getInitialState();
    // No selected producers or customers during creation
    // Product form uses these during Edit mode
    const selectedProducer = "";
    const selectedCustomers = [];

    if (loading) {
      content = <Spinner />;
    } else {
      content = (
        <ProductForm
          msg={msg}
          productObj={productObj}
          producerOptions={producers}
          selectedProducer={selectedProducer}
          selectedCustomers={selectedCustomers}
          customerOptions={customers}
          handleSendMsg={this.handleSendMsg}
          handleSubmit={this.handleSubmit}
        />
      );
    }

    return (
      <div className="container">
        <Message cb={this.props.startGetClients} />
        <Heading title="Create Product" />
        <div className="row">
          <div className="col-xs-12 col-md-8 mx-auto">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui, customer, producer }) => ({
  msg: ui.msg,
  options: ui.options,
  loading: ui.loading,
  producers: producer.producers, // select options
  customers: customer.customers // select options
});

export default connect(
  mapStateToProps,
  {
    productLoaded,
    createProduct,
    startGetProducers,
    startGetCustomers,
    startGetClients,
    serverMsg,
    changeRoute
  }
)(withRouter(CreateProduct));
