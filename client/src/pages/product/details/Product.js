import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// common components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import TopRowBtns from "../../../components/TopRowBtns";
// custom components
import InfoCard from "./components/InfoCard";
import LocationCard from "./components/LocationCard";
import ToggleListCard from "./components/ToggleListCard";
import MeasurmentCard from "./components/MeasurmentCard";
import ClientsCard from "./components/ClientsCard";
// helpers
import createDetailsArray from "./helpers/createDetailsArray";
import createLocationObj from "./helpers/createLocationObj";
import createMeasurmentsArray from "./helpers/createMeasurmentsArray";
import createProducerArray from "./helpers/createProducerArray";
import createCustomersArray from "./helpers/createCustomersArray";
// utils
import createObjWithAllPropsAsArrays from "../../../utils/createObjWithAllPropsAsArrays";
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
import {
  productLoaded,
  startGetProduct,
  deleteProduct
} from "../../../actions/product";

class Product extends Component {
  state = {
    bt1Disable: false,
    bt2Disable: false
  };
  // lifecycle -------------------------------------
  componentDidMount() {
    // Redirect to details after saving or updating a product
    const { msg } = this.props;

    // hide the success message after 3 seconds
    if (msg && msg.code === "hide-3") {
      window.scrollTo(0, 0);
      setTimeout(() => {
        this.props.serverMsg(null);
      }, 3000);
    }

    this.getProduct();
  }

  componentDidUpdate(nextProps, state) {
    const { msg } = nextProps;

    // hide the success message after 3 seconds
    if (msg && msg.code === "hide-3") {
      window.scrollTo(0, 0);
      setTimeout(() => {
        this.props.serverMsg(null);
      }, 3000);
    }

    // used for retrieve product button errors
    if (msg && msg.code === "throw new Error") {
      window.scrollTo(0, 0);
    }

    // if there is an error while trying to delete a product
    // enable the delete btn after the msg is closed
    if (msg && msg.code === "delete err") {
      if (state.bt1Disable === true) {
        this.setState({ bt1Disable: false });
      }
    }
  }

  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg(msg, options, serverMsg);
    // update this page to be the FROM route
    changeRoute("/products/:productId");
  }

  // api calls ---------------------------------------
  getProduct = () => {
    const {
      productEntity,
      product,
      productLoaded,
      startGetProduct,
      match
    } = this.props;
    const { productId } = match.params;

    // check store for product in productEntity map
    if (productEntity) {
      if (productEntity[productId]) {
        productLoaded(productEntity[productId]);
        return;
      }
    }

    // check store if single product equal requested product
    if (product && product._id === productId) return;

    // clear old data
    productLoaded(null);
    // fetch new data from api
    startGetProduct(productId);
  };

  // events -----------------------------------------
  onDeleteProduct = () => {
    // don't let the user click more than once
    this.setState({ bt1Disable: true });
    const { deleteProduct, match, history } = this.props;
    const { productId } = match.params;
    // api call
    deleteProduct(productId, history);
  };

  onEditProduct = () => {
    const { match, history } = this.props;
    const { productId } = match.params;
    history.push(`/products/edit/${productId}`);
  };

  onUnlinkProduct = () => {};

  render() {
    const { product, loading, match, history } = this.props;
    const { productId } = match.params;

    let content;

    if (loading) {
      content = <Spinner />;
    } else if (product) {
      const {
        // array ----------
        packagingPictures,
        productPictures,
        comments,
        productMaterial,
        customer: customers,
        // obj ----------
        producer,
        packagingMeasurments,
        productMeasurments,
        productLocation
      } = product;

      const defaultedObj = createObjWithAllPropsAsArrays([
        { packagingPictures },
        { productPictures },
        { comments },
        { productMaterial },
        { customers }
      ]);

      // Card Data ----------------------------------------
      // Info Card
      const productDetails = createDetailsArray(product);
      // Location Card
      const locationDetails = createLocationObj(productLocation, productId);
      // MeasurmentCard
      const measurmentDetails = createMeasurmentsArray(
        productMeasurments,
        packagingMeasurments
      );
      // ClientsCard
      const producerDetails = createProducerArray(producer);
      const customersDetails = createCustomersArray(defaultedObj.customers);

      content = (
        <div>
          <InfoCard
            productId={productId}
            productDetails={productDetails}
            productPictures={defaultedObj.productPictures}
            packagingPictures={defaultedObj.packagingPictures}
            // router
            history={history}
          />

          <LocationCard
            productId={productId}
            productLocationObj={locationDetails}
            // cb
            unlinkCb={this.onUnlinkProduct}
            history={history}
          />

          <ToggleListCard array={comments} label="Comments" />
          <ToggleListCard array={productMaterial} label="Materials" />

          {measurmentDetails.map((array, i) => (
            <MeasurmentCard array={array} key={i} />
          ))}

          <ClientsCard array={producerDetails} />

          {customersDetails.map((array, i) => (
            <ClientsCard array={array} key={i} />
          ))}
        </div>
      );
    }

    return (
      <div className="container">
        <Message cb={this.getProduct} />
        {product && (
          <TopRowBtns
            bt1Disable={this.state.bt1Disable}
            bt2Disable={this.state.bt2Disable}
            btn1Cb={this.onDeleteProduct}
            btn2Cb={this.onEditProduct}
            showRightBtns={true}
            headingTitle="Product Details"
          />
        )}
        <Heading title="Product Details" />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, product }) => ({
  loading: ui.loading,
  options: ui.options,
  msg: ui.msg,
  product: product.product,
  productEntity: product.productEntity
});

export default connect(
  mapStateToProps,
  {
    serverMsg,
    changeRoute,
    productLoaded,
    startGetProduct,
    deleteProduct
  }
)(withRouter(Product));
