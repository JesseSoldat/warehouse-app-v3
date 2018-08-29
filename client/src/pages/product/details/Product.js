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
import { unlinkProduct } from "../../../actions/unlink";

class Product extends Component {
  // lifecycle -------------------------------------
  componentDidMount() {
    this.getProduct();
  }

  componentWillUnmount() {
    const { msg, options, serverMsg } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg(msg, options, serverMsg);
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

    // check store if single product equal requested product
    if (product && product._id === productId) return;

    // check store for product in productEntity map
    if (productEntity) {
      if (productEntity[productId]) {
        productLoaded(productEntity[productId]);
        return;
      }
    }

    // fetch new data from api
    startGetProduct(productId);
  };

  // events -----------------------------------------
  onDeleteProduct = () => {
    const { productId } = this.props.match.params;
    this.props.deleteProduct(productId, this.props.history);
  };

  onEditProduct = () => {
    const { match, history } = this.props;
    const { productId } = match.params;
    history.push(`/products/edit/${productId}`);
  };

  onUnlinkProduct = () => {
    const { product, unlinkProduct } = this.props;
    const { productLocation, _id } = product;
    const { kind, item } = productLocation;
    const productId = _id;

    // remove product from shelf spot
    if (kind === "shelfSpot") {
      const shelfSpotId = item._id;
      const obj = { shelfSpotId, kind, productId };
      unlinkProduct(obj, product);
    }
    // remove product from box
    else if (kind === "box") {
      const boxId = item._id;
      const obj = { boxId, kind, productId };
      console.log("shelfSpot", obj);
      unlinkProduct(obj, product);
    }
  };

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
    deleteProduct,
    unlinkProduct
  }
)(withRouter(Product));
