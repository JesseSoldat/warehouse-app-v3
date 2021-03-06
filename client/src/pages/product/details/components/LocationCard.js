import React from "react";
import { Link } from "react-router-dom";

// common components
import SingleField from "../../../../components/SingleField";
import IconBtn from "../../../../components/buttons/IconBtn";

const LocationCard = ({
  productLocationObj,
  productId,
  history,
  width = "12",
  // Cbs
  unlinkCb
}) => {
  // haveLocation true | false

  const { haveLocation, data } = productLocationObj;
  const divWidth = `col-xs-12 col-md-${width}`;

  let content;

  // events ---------------------------------------------
  const onLink = (productId, type) => {
    const url = `/barcode/scan/product/${productId}?type=${type}`;
    history.push(url);
  };

  const onUnLink = (productId, kind) => {
    const obj = { type: kind, productId };
    unlinkCb(obj);
  };

  // render html ----------------------------------------------
  const renderOnLinkBtn = (css = "", btnCss = "") => {
    return (
      <div className={`col-12 ${css}`}>
        <IconBtn
          btnClass={`btn-primary ${btnCss}`}
          iconClass="fa-archive d-none d-sm-inline mr-1"
          text="Store Product"
          cb={() => onLink(productId, "storeProduct")}
        />
      </div>
    );
  };

  const renderBreadCrumb = ({
    haveLocation,
    storageId,
    rackId,
    shelfId,
    spotId: shelfSpotId,
    boxId
  }) => {
    const storageLink = haveLocation ? (
      <li>
        <Link to={`/storage/${storageId}`}>Storage</Link>
      </li>
    ) : null;

    const rackLink = haveLocation ? (
      <li>
        <Link to={`/rack/${storageId}/${rackId}?type=rack`}>Rack</Link>
      </li>
    ) : null;

    const shelfLink = haveLocation ? (
      <li>
        <Link to={`/shelf/${storageId}/${rackId}/${shelfId}?type=shelf`}>
          Shelf
        </Link>
      </li>
    ) : null;

    const shelfSpotLink = haveLocation ? (
      <li>
        <Link
          to={`/shelfSpot/${storageId}/${rackId}/${shelfId}/${shelfSpotId}?type=shelfSpot`}
        >
          Shelf Spot
        </Link>
      </li>
    ) : null;

    const boxLink = haveLocation ? (
      <li>
        <Link
          to={`/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=box`}
        >
          Box
        </Link>
      </li>
    ) : (
      <li>
        <Link to={`/box/${boxId}?type=box`}>Box</Link>
      </li>
    );

    return (
      <ul className="customBreadcrumb d-inline-block">
        {storageLink}
        {rackLink}
        {shelfLink}
        {shelfSpotLink}
        {boxId && boxLink}
      </ul>
    );
  };

  // No Location render the defaults --------------------------------------
  if (!haveLocation) {
    content = (
      <div>
        <div className="row mb-3">
          <div className="col-12 d-none d-sm-block">
            {renderOnLinkBtn("d-flex justify-content-sm-end", "mr-2")}
          </div>

          <div className="col-12 d-block d-sm-none">
            {renderOnLinkBtn("d-flex flex-column", "mb-3")}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h4 className="pb-3">
                <strong>Product Location</strong>
              </h4>
            </div>
            <div>
              <ul className="list-group list-group-flush">
                {data.map(({ label, value }, index) => (
                  <SingleField label={label} value={value} key={index} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Have Location render the location --------------------------------------
  else {
    const { kind, breadcrumb } = productLocationObj;

    // render html -----------------------------------
    const renderOnUnLinkBtn = (css = "", btnCss = "") => {
      return (
        <div className={`col-12 ${css}`}>
          <IconBtn
            btnClass={`btn-secondary ${btnCss}`}
            iconClass="fa-archive d-none d-sm-inline mr-1"
            text="Restore Product"
            cb={() => onLink(productId, "restoreProduct")}
          />
          <IconBtn
            btnClass={`btn-primary ${btnCss}`}
            iconClass="fa-hand-paper d-none d-sm-inline mr-1"
            text="Retrieve Product"
            cb={() => onUnLink(productId, kind)}
          />
        </div>
      );
    };

    // set the content
    content = (
      <div>
        <div className="row mb-3">
          <div className="col-12 d-none d-sm-block">
            {renderOnUnLinkBtn("d-flex justify-content-sm-end", "mr-2")}
          </div>

          <div className="col-12 d-block d-sm-none">
            {renderOnUnLinkBtn("d-flex flex-column", "mb-2")}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h4 className="pb-3">
                <strong>Product Location</strong>
              </h4>
            </div>
            <div>
              <ul className="list-group list-group-flush">
                {data.map(({ label, value }, index) => (
                  <SingleField label={label} value={value} key={index} />
                ))}
                <div>
                  <strong className="pl-4 d-inline-block">Location:</strong>
                  {renderBreadCrumb(breadcrumb)}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className={divWidth}>
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-12">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
