import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

// components
import Heading from "../../../components/Heading";
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
// actions
import { productLoaded, startGetProduct } from "../../../actions/product";
import { uploadImage } from "../../../actions/image";

class ProductImages extends Component {
  state = {
    picture: "",
    isUploading: false,
    progress: 0,
    pictureURL: ""
  };

  // lifecycles --------------------------------------------------
  componentDidMount() {
    this.getProduct();
  }

  // state setup - api calls -----------------------------------------
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

    // fetch new data from api
    this.props.startGetProduct(productId);
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ pictureURL: url }));
  };

  renderPicsContainer = (title, picArray) => (
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
            <img
              key={i}
              src={picUrl}
              style={{ width: "150px", height: "150px" }}
              className="img-thumbnail m-2"
            />
          ))}
        </div>
      </div>
    </Fragment>
  );

  render() {
    const { loading, match, product } = this.props;
    const { productId } = match.params;
    let content, prodPicsContainer, packPicsContainer;

    if (loading) {
      content = <Spinner />;
    } else if (product && product._id === productId) {
      content = (
        <form>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.pictureURL && (
            <img
              src={this.state.pictureURL}
              style={{ width: "150px", height: "150px" }}
              className="img-thumbnail m-2"
            />
          )}
          <label
            style={{
              backgroundColor: "steelblue",
              color: "white",
              padding: 10,
              borderRadius: 4,
              pointer: "cursor"
            }}
          >
            Select an Image
            <FileUploader
              hidden
              accept="image/*"
              name="picture"
              randomizeFilename
              storageRef={firebase.storage().ref("images")}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
          </label>
        </form>
      );

      const { productPictures, packagingPictures } = product;

      prodPicsContainer = this.renderPicsContainer(
        "Product Pictures",
        productPictures
      );
      packPicsContainer = this.renderPicsContainer(
        "Packaging Pictures",
        packagingPictures
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
  { productLoaded, startGetProduct, uploadImage }
)(withRouter(ProductImages));
