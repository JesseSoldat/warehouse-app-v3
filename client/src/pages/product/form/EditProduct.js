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
import {
  startLoading,
  startShowOverlay,
  sendServerMsg
} from "../../../actions/ui";
import {
  productLoaded,
  startGetClients,
  startGetProductWithClients,
  editProduct
} from "../../../actions/product";
import { startGetProducers } from "../../../actions/producer";
import { startGetCustomers } from "../../../actions/customer";

class EditProduct extends Component {
  // Lifecycles ------------------------------------------
  componentDidMount() {
    this.getFormData();
  }

  componentWillUnmount() {
    const { msg, sendServerMsg } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg({ msg, sendServerMsg, from: "editProductClearMsg" });
  }

  // Api Calls ----------------------------------------
  getFormData = () => {
    const { productEntity, product, customers, producers, match } = this.props;
    const { productId } = match.params;

    let haveProduct = false;
    let haveCustomers = false;
    let haveProducers = false;

    // PRODUCT ----------------------------------
    // check store if single product equal requested product
    if (product && product._id === productId) {
      haveProduct = true;
    }
    // check store for product in productEntity map
    else if (productEntity) {
      if (productEntity[productId]) {
        this.props.productLoaded(productEntity[productId]);
        haveProduct = true;
      }
    }

    // CUSTOMERS ----------------------------------
    if (customers.length > 0) {
      haveCustomers = true;
    }
    // PRODUCERS ----------------------------------
    if (producers.length > 0) {
      haveProducers = true;
    }

    // have all the data already
    if (haveProduct && haveCustomers && haveProducers) {
      console.log("Have Product, Customers, Producers");
      return;
    }

    // Load from the STORE
    this.props.startLoading({ from: "editProductLoading" });

    if (haveProduct && !haveCustomers && !haveProducers) {
      console.log("Have Product but NO Clients");

      this.props.startGetClients();
    } else if (haveProduct && !haveCustomers && haveProducers) {
      console.log("Have Product and Producer NO Customers");

      this.props.startGetCustomers();
    } else if (haveProduct && haveCustomers && !haveProducers) {
      console.log("Have Product and Customers NO Producer");

      this.props.startGetProducers();
    } else if (!haveProduct && haveCustomers && haveProducers) {
      console.log("Have Clients NO Product");

      this.props.productLoaded(null);
      this.props.startGetProduct(productId);
    } else if (!haveProduct && !haveCustomers && !haveProducers) {
      console.log("NO Product && NO Clients");

      this.props.startGetProductWithClients(productId);
    }
  };

  // Events and Cbs ------------------------------------------
  handleSubmit = form => {
    const { productId } = this.props.match.params;
    // Api Calls
    this.props.startShowOverlay({ from: "editProductOverlay" });
    this.props.editProduct(productId, form, this.props.history);
  };

  handleSendMsg = msg => {
    this.props.serverMsg(msg);
  };

  // Render ---------------------------------------
  render() {
    const { product, loading, producers, customers } = this.props;

    let content;

    if (loading) {
      content = <Spinner />;
    } else if (product && producers.length > 0 && customers.length > 0) {
      // productObj & selectedProducer & selectedCustomers - used to hydrate child form's state
      const {
        productObj,
        selectedProducer,
        selectedCustomers
      } = createEditState(product);

      content = (
        <ProductForm
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

const mapStateToProps = ({ ui, product, producer, customer }) => {
  return {
    product: product.product,
    productEntity: product.productEntity,
    loading: ui.loading,
    msg: ui.msg,
    producers: producer.producers,
    customers: customer.customers
  };
};
export default connect(
  mapStateToProps,
  {
    startLoading,
    startShowOverlay,
    sendServerMsg,
    productLoaded,
    startGetProducers,
    startGetCustomers,
    startGetClients,
    startGetProductWithClients,
    editProduct
  }
)(withRouter(EditProduct));
