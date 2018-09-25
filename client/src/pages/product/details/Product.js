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
import MeasurementCard from "./components/MeasurementCard";
import ClientsCard from "./components/ClientsCard";
// helpers
import createDetailsArray from "./helpers/createDetailsArray";
import createLocationObj from "./helpers/createLocationObj";
import createMeasurementsArray from "./helpers/createMeasurementsArray";
import createProducerArray from "./helpers/createProducerArray";
import createCustomersArray from "./helpers/createCustomersArray";
// utils
import createObjWithAllPropsAsArrays from "../../../utils/createObjWithAllPropsAsArrays";
// actions
import { showOverlay, serverMsg, startLoading } from "../../../actions/ui";
import {
  productLoaded,
  startGetProduct,
  deleteProduct
} from "../../../actions/product";
import {
  startUnlinkProductFromShelfSpot,
  startUnlinkProductFromBox
} from "../../../actions/unlink";

class Product extends Component {
  // Lifecycles -------------------------------------
  componentDidMount() {
    this.getProduct();
  }

  componentWillUnmount() {
    const { msg, serverMsg } = this.props;
    if (msg && msg.color === "danger")
      serverMsg(null, "productDetailsClearMsg");
  }

  // API CALLS ---------------------------------------
  getProduct = () => {
    const {
      productEntity,
      product,
      productLoaded,
      startGetProduct,
      match
    } = this.props;
    const { productId } = match.params;

    // Load from the STORE
    // check store if single product equal requested product
    if (product && product._id === productId) return;

    if (productEntity) {
      if (productEntity[productId]) {
        return productLoaded(productEntity[productId]);
      }
    }

    // Load from the API
    this.props.startLoading({ from: "productDetailsLoading" });
    startGetProduct(productId);
  };

  // Events and Cbs -----------------------------------------
  onDeleteProduct = () => {
    const { productId } = this.props.match.params;
    // Api Calls
    this.props.showOverlay({ from: "productOnDeleteProductOverlay" });
    this.props.deleteProduct(productId, this.props.history);
  };

  onEditProduct = () => {
    const { match, history } = this.props;
    const { productId } = match.params;
    history.push(`/products/edit/${productId}`);
  };

  onUnlinkProduct = () => {
    const { productLocation, _id } = this.props.product;
    const { kind, item } = productLocation;
    const productId = _id;

    // Remove Product from ShelfSpot
    if (kind === "shelfSpot") {
      const shelfSpotId = item._id;
      const shelfSpotAndProductIds = { shelfSpotId, productId };
      // Api Call
      this.props.showOverlay({
        from: "productDetailsShowOverlayUnlinkFromShelfSpot"
      });
      this.props.startUnlinkProductFromShelfSpot(shelfSpotAndProductIds);
    }
    // Remove Product from Box
    else if (kind === "box") {
      const boxId = item._id;
      const boxAndProductIds = { boxId, productId };
      // Api Call
      this.props.showOverlay({
        from: "productDetailsShowOverlayUnlinkFromBox"
      });
      this.props.startUnlinkProductFromBox(boxAndProductIds);
    }
  };

  // Render -----------------------------------
  render() {
    const { product, match, history } = this.props;
    const { productId } = match.params;

    let content;

    if (!product) {
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
        packagingMeasurements,
        productMeasurements,
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
      // MeasurementCard
      const measurementDetails = createMeasurementsArray(
        productMeasurements,
        packagingMeasurements
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

          {measurementDetails.map((array, i) => (
            <MeasurementCard array={array} key={i} />
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
  msg: ui.msg,
  product: product.product,
  productEntity: product.productEntity
});

export default connect(
  mapStateToProps,
  {
    showOverlay,
    startLoading,
    serverMsg,
    productLoaded,
    startGetProduct,
    deleteProduct,
    startUnlinkProductFromShelfSpot,
    startUnlinkProductFromBox
  }
)(withRouter(Product));
