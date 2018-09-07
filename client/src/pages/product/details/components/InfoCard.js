import React from "react";

// common components
import IconBtn from "../../../../components/buttons/IconBtn";
import Carousel from "../../../../components/Carousel";
import SingleField from "../../../../components/SingleField";

const InfoCard = ({
  productId,
  productDetails,
  productPictures,
  packagingPictures,
  history
}) => {
  // events --------------------------------
  const onCreateBarCode = productId => {
    history.push(`/barcode/create/product/${productId}`);
  };

  const onManagePictures = productId => {
    history.push(`/products/images/${productId}`);
  };

  // render ui -----------------------------
  const renderImage = (productPictures, packagingPictures) => {
    let picturesArray = [];
    if (Array.isArray(productPictures)) {
      picturesArray = [...picturesArray, ...productPictures];
    }
    if (Array.isArray(packagingPictures)) {
      picturesArray = [...picturesArray, ...packagingPictures];
    }

    const placeholderImg = "http://via.placeholder.com/250x250?text=No Image";

    return picturesArray.length >= 1 ? (
      <Carousel picturesArray={picturesArray} />
    ) : (
      <img
        className="mx-auto d-block pt-5"
        src={placeholderImg}
        alt="product"
      />
    );
  };

  const renderBtns = (css = "", btnCss = "") => {
    return (
      <div className={`col-12 ${css}`}>
        <IconBtn
          btnClass={`btn-secondary ${btnCss}`}
          iconClass="fa-chevron-right d-none d-sm-inline"
          text="Manage Pictures"
          cb={() => onManagePictures(productId)}
        />

        <IconBtn
          btnClass={`btn-primary ${btnCss}`}
          iconClass="fa-barcode d-none d-sm-inline"
          text="Create Barcode"
          cb={() => onCreateBarCode(productId)}
        />
      </div>
    );
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card card-body mb-3">
          <div className="row mb-2">
            <div className="col-12 d-none d-sm-block">
              {renderBtns("d-flex justify-content-sm-end", "mr-2")}
            </div>
            <div className="col-12 d-block d-sm-none">
              {renderBtns("d-flex flex-column", "mb-2")}
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-6 ml-mr-auto">
              <ul className="list-group list-group-flush">
                {productDetails.map(({ label, value }, i) => (
                  <SingleField label={label} value={value} key={i} />
                ))}
              </ul>
            </div>

            <div className="col-xs-12 col-1" />

            <div className="col-xs-12 col-md-5">
              <div className="row">
                <div className="col-11 pt-3 mr-2">
                  {renderImage(productPictures, packagingPictures)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
