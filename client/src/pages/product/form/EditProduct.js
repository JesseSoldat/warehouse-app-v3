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
import createEditState from "./helpers/createEditState";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
import {
  getProductDetails,
  startGetProductWithClients,
  editProduct
} from "../../../actions/product";

class EditProduct extends Component {
  // lifecycle ------------------------------------------
  componentDidMount() {
    this.getFormData();
  }

  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg(msg, options, serverMsg);
    // update this page to be the FROM route
    changeRoute("/products/edit/:productId");
  }

  // api calls ----------------------------------------
  getFormData = () => {
    const { productId } = this.props.match.params;
    // reset old data
    this.props.getProductDetails(null);
    // get product / list of all producers & clients
    this.props.startGetProductWithClients(productId);
  };

  // events ------------------------------------------
  handleSubmit = form => {
    const { productId } = this.props.match.params;
    // api call
    this.props.editProduct(productId, form, this.props.history);
  };

  handleSendMsg = msg => {
    this.props.serverMsg(msg);
  };

  render() {
    const { msg, product, loading, producers, customers } = this.props;

    // productObj & selectedProducer & selectedCustomers - used to hydrate child form's state
    const { productObj, selectedProducer, selectedCustomers } = createEditState(
      product
    );

    let content;

    if (loading) {
      content = <Spinner />;
    } else if (!product) {
      content = <Spinner />;
    } else {
      content = (
        <ProductForm
          msg={msg}
          productObj={productObj}
          producerOptions={producers}
          selectedProducer={selectedProducer}
          customerOptions={customers}
          selectedCustomers={selectedCustomers}
          handleSendMsg={this.handleSendMsg}
          handleSubmit={this.handleSubmit}
        />
      );
    }

    return (
      <div className="container">
        <Message cb={this.getFormData} />
        <Heading title="Edit Product" />
        <div className="row">
          <div className="col-xs-12 col-md-8 mx-auto">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui, router, product, producer, customer }) => {
  return {
    product: product.product,
    loading: ui.loading,
    options: ui.options,
    msg: ui.msg,
    from: router.from,
    producers: producer.producers,
    customers: customer.customers
  };
};
export default connect(
  mapStateToProps,
  {
    changeRoute,
    serverMsg,
    getProductDetails,
    startGetProductWithClients,
    editProduct
  }
)(withRouter(EditProduct));
