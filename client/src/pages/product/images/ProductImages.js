import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase/app";
import "firebase/storage";

import FileUploader from "react-firebase-file-uploader";

// common components
import Heading from "../../../components/Heading";
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
// custom components
import ImageCard from "./components/ImageCard";
// helpers
import buildClientMsg from "../../../actions/helpers/buildClientMsg";
// actions
import {
  showOverlay,
  hideOverlay,
  serverMsg,
  startLoading
} from "../../../actions/ui";
import { productLoaded, startGetProduct } from "../../../actions/product";
import { uploadImage, deleteImage } from "../../../actions/image";

class ProductImages extends Component {
  state = {
    type: "productPictures"
  };

  // Lifecycles --------------------------------------------------
  componentDidMount() {
    this.getProduct();
  }

  // Api Calls -----------------------------------------
  getProduct = () => {
    const { productEntity, product, match } = this.props;
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

    // Api Calls
    this.props.startLoading({ from: "productImagesLoading" });
    this.props.startGetProduct(productId);
  };

  // Events and Cbs ------------------------------
  selectType = e => {
    this.setState({ type: e.target.value });
  };

  // uploading
  handleUploadStart = () => {
    this.props.showOverlay({ from: "productImagesShowOverlay" });
  };

  handleUploadError = err => {
    this.props.hideOverlay({ from: "productImagesHideOverlay" });
    console.error("handleUploadError", err);
  };

  handleUploadSuccess = filename => {
    const { product } = this.props;
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.props.uploadImage(url, this.state.type, product);
      });
  };

  // delete image
  handleDeleteImage = async (url, type) => {
    const { product } = this.props;

    try {
      if (url.includes("firebasestorage.googleapis.com")) {
        const deleteRef = firebase.storage().refFromURL(url);
        await deleteRef.delete();
      }

      this.props.deleteImage(url, type, product);
    } catch (err) {
      this.props.hideOverlay({ from: "productImagesHideOverlay" });
      console.log("Err deleting img", err);
    }
  };

  // Server msg
  showServerMsg = key => {
    const msgs = {
      size: "The file you are trying to upload is too large.",
      type: "Only images can be uploaded."
    };
    const msg = msgs[key];

    this.props.serverMsg(buildClientMsg({ info: msg, color: "red" }));
  };

  // Return HTML -----------------------------------
  renderPicsContainer = (title, picArray, type) => (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <h4 className="text-center">{title}</h4>
          <hr />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-xs-12 mx-auto pb-3">
          {picArray.map((picUrl, i) => (
            <ImageCard
              key={i}
              picUrl={picUrl}
              type={type}
              handleDeleteImage={this.handleDeleteImage}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );

  // Render --------------------------------------
  render() {
    const { loading, match, product } = this.props;
    const { productId } = match.params;
    let content, prodPicsContainer, packPicsContainer;

    if (loading) {
      content = <Spinner />;
    } else if (product && product._id === productId) {
      content = (
        <form>
          <div className="input-group mb-3 mr-3">
            <div className="input-group-prepend">
              <label className="input-group-text">Options</label>
            </div>
            <select className="custom-select" onChange={this.selectType}>
              <option value="productPictures">Product Pictures</option>
              <option value="packagingPictures">Packaging Pictures</option>
            </select>
          </div>
          <label
            style={{
              display: "block",
              backgroundColor: "steelblue",
              color: "white",
              padding: 5,
              borderRadius: 4,
              pointer: "cursor",
              textAlign: "center"
            }}
          >
            Select an Image
            <FileUploader
              beforeUploadStart={file => {
                if (!/^image\/.*/.test(file.type)) {
                  this.showServerMsg("type");
                  throw new Error("Invalid type");
                } else if (file.size > 1e6) {
                  this.showServerMsg("size");
                  throw new Error("File too large");
                }
              }}
              hidden
              accept="image/*"
              name="picture"
              randomizeFilename
              storageRef={firebase.storage().ref("images")}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
            />
          </label>
        </form>
      );

      const { productPictures, packagingPictures } = product;

      prodPicsContainer = this.renderPicsContainer(
        "Product Pictures",
        productPictures,
        "productPictures"
      );
      packPicsContainer = this.renderPicsContainer(
        "Packaging Pictures",
        packagingPictures,
        "packagingPictures"
      );
    }

    return (
      <div className="container">
        <Message />
        <Heading title="Product Images" />
        <div className="row py-4">
          <div className="col-xs-12 col-sm-10 col-md-8 mx-auto">{content}</div>
        </div>
        {prodPicsContainer}
        {packPicsContainer}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, product }) => ({
  loading: ui.loading,
  productEntity: product.productEntity,
  product: product.product
});

export default connect(
  mapStateToProps,
  {
    serverMsg,
    showOverlay,
    hideOverlay,
    startLoading,
    productLoaded,
    startGetProduct,
    uploadImage,
    deleteImage
  }
)(ProductImages);
