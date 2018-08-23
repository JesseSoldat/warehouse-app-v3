import React from "react";
import { withRouter, Link } from "react-router-dom";

const BreadCrumb = ({ match }) => {
  const { params, path } = match;
  const {
    productId,
    producerId,
    customerId,
    storageId,
    rackId,
    shelfId,
    shelfSpotId,
    boxId
  } = params;

  let link1, link2, link3, link4, link5, text;

  const allLinks = {
    dashboard: "/dashboard",
    products: "/products/search",
    product: `/products/${productId}`,
    producers: "/producers/search",
    producer: `/producers/${producerId}`,
    customers: "/customers/search",
    customer: `/customers/${customerId}`,
    storages: "/storages",
    storage: `/storage/${storageId}`,
    rack: `/rack/${storageId}/${rackId}?type=rack`,
    shelf: `/shelf/${storageId}/${rackId}/${shelfId}?type=shelf`,
    shelfspot: `/shelfSpot/${storageId}/${rackId}/${shelfId}/${shelfSpotId}?type=shelfSpot`,
    box: `/box/${boxId}?type=box`,
    boxLocation: `/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=box`,
    store: "/barcode/scan?type=linkBoxToSpot"
  };

  const createLink = (name, linkKey = null) => {
    let key = linkKey ? linkKey : name.toLowerCase();

    // avoid app break if key is not found
    key = allLinks[key] ? allLinks[key] : "/dashboard";
    return (
      <li className="breadcrumb-item site-breadcrumb-link">
        <Link to={key}>{name}</Link>
      </li>
    );
  };

  const createText = text => (
    <li className="breadcrumb-item site-breadcrumb-link">{text}</li>
  );

  switch (path) {
    // GENERAL ROUTES
    case "/dashboard":
      text = createText("Welcome");
      break;

    // ADMIN ROUTES
    case "/admin/manageUsers":
      link1 = createLink("Dashboard");
      text = createText("Admin");
      break;

    case "/admin/playGround":
      link1 = createLink("Dashboard");
      text = createText("Playground");
      break;

    // PRODUCT ROUTES
    case "/products/search":
      link1 = createLink("Dashboard");
      text = createText("Products");
      break;

    case "/products/:productId":
      link1 = createLink("Products");
      text = createText("Product");
      break;

    case "/products/edit/:productId":
      link1 = createLink("Products");
      link2 = createLink("Product");
      text = createText("Edit");
      break;

    case "/products/create":
      link1 = createLink("Products");
      text = createText("Create");
      break;
    case "/products/images/:productId":
      link1 = createLink("Products");
      link2 = createLink("Product");
      text = createText("Image");
      break;

    // PRODUCERS ROUTES
    case "/producers/search":
      link1 = createLink("Dashboard");
      text = createText("Products");
      break;

    case "/producers/:producerId":
      link1 = createLink("Producers");
      text = createText("Producer");
      break;

    case "/producers/edit/:producerId":
      link1 = createLink("Producers");
      link2 = createLink("Producer");
      text = createText("Edit");
      break;

    case "/producers/create":
      link1 = createLink("Producers");
      text = createText("Create");
      break;

    // CUSTOMERS ROUTES
    case "/customers/search":
      link1 = createLink("Dashboard");
      text = createText("Customers");
      break;

    case "/customers/:customerId":
      link1 = createLink("Customers");
      text = createText("Customer");
      break;

    case "/customers/edit/:customerId":
      link1 = createLink("Customers");
      link2 = createLink("Customer");
      text = createText("Edit");
      break;

    case "/customers/create":
      link1 = createLink("Customers");
      text = createText("Create");
      break;

    // STORAGES ROUTES ---------------------------------------------
    case "/storages":
      link1 = createLink("Dashboard");
      text = createText("Storages");
      break;

    case "/storages/search":
      link1 = createLink("Dashboard");
      text = createText("Storages");
      break;

    // STORAGE DETAILS
    case "/storage/:storageId":
      link1 = createLink("Storages");
      text = createText("Storage");
      break;

    case "/rack/:storageId/:rackId":
      link1 = createLink("Storages");
      link2 = createLink("Storage");
      text = createText("Rack");
      break;

    case "/shelf/:storageId/:rackId/:shelfId":
      link1 = createLink("Storages");
      link2 = createLink("Storage");
      link3 = createLink("Rack");
      text = createText("Shelf");
      break;

    case "/shelfSpot/:storageId/:rackId/:shelfId/:shelfSpotId":
      link1 = createLink("Storages");
      link2 = createLink("Storage");
      link3 = createLink("Rack");
      link4 = createLink("Shelf");
      text = createText("ShelfSpot");
      break;

    case "/box/:boxId":
      link1 = createLink("Store");
      text = createText("Box");
      break;

    case "/box/:storageId/:rackId/:shelfId/:shelfSpotId/:boxId":
      link2 = createLink("Storage");
      link3 = createLink("Rack");
      link4 = createLink("Shelf");
      link5 = createLink("ShelfSpot");
      text = createText("Box");
      break;

    // STORAGE CREATE
    case "/storage/create":
      link1 = createLink("Storages");
      text = createText("Create");
      break;

    case "/rack/create/:storageId":
      link1 = createLink("Storages");
      link2 = createLink("Storage");
      text = createText("Create");
      break;

    case "/shelf/create/:storageId/:rackId":
      link1 = createLink("Storages");
      link2 = createLink("Storage");
      link3 = createLink("Rack");
      text = createText("Create");
      break;

    case "/shelfSpot/create/:storageId/:rackId/:shelfId":
      link1 = createLink("Storages");
      link2 = createLink("Storage");
      link3 = createLink("Rack");
      link4 = createLink("Shelf");
      text = createText("Create");
      break;

    case "/box/create":
      link1 = createLink("Storages");
      text = createText("Create");
      break;

    case "/box/create/:storageId/:rackId/:shelfId/:shelfSpotId":
      link1 = createLink("Storages");
      link2 = createLink("Storage");
      link3 = createLink("Rack");
      link4 = createLink("Shelf");
      link4 = createLink("Shelf Spot");
      text = createText("Create");
      break;

    // STORAGE EDIT
    case "/storage/edit/:storageId":
      link1 = createLink("Storages");
      link2 = createLink("Storage");
      text = createText("Edit");
      break;

    case "/rack/edit/:storageId/:rackId":
      link1 = createLink("Storages");
      link2 = createLink("Storage");
      link3 = createLink("Rack");
      text = createText("Edit");
      break;

    case "/shelf/edit/:storageId/:rackId/:shelfId":
      link1 = createLink("Storages");
      link2 = createLink("Storage");
      link3 = createLink("Rack");
      link4 = createLink("Shelf");
      text = createText("Edit");
      break;

    case "/shelfSpot/edit/:storageId/:rackId/:shelfId/:shelfSpotId":
      link1 = createLink("Storages");
      link2 = createLink("Storage");
      link3 = createLink("Rack");
      link4 = createLink("Shelf");
      link5 = createLink("ShelfSpot");
      text = createText("Edit");
      break;

    // No location
    case "/box/edit/:boxId":
      link1 = createLink("Box");
      text = createText("Edit");
      break;

    // have location
    case "/box/edit/:storageId/:rackId/:shelfId/:shelfSpotId/:boxId":
      link1 = createLink("Storage");
      link2 = createLink("Rack");
      link3 = createLink("Shelf");
      link4 = createLink("ShelfSpot");
      link5 = createLink("Box", "boxLocation");
      text = createText("Edit");
      break;

    // BARCODE ROUTES ------------------------------------------
    // scan
    case "/barcode/scan":
      link1 = createLink("Dashboard");
      text = createText("Link");
      break;
    // No location
    case "/barcode/scan/box/:boxId":
      link1 = createLink("Box");
      text = createText("Link");
      break;
    // have loaction
    case "/barcode/scan/box/:storageId/:rackId/:shelfId/:shelfSpotId/:boxId":
      link1 = createLink("Storage");
      link2 = createLink("Rack");
      link3 = createLink("Shelf");
      link4 = createLink("ShelfSpot");
      link5 = createLink("Box", "boxLocation");
      text = createText("Link");
      break;

    case "/barcode/scan/product/:productId":
      link1 = createLink("Product");
      text = createText("Link");
      break;

    // create
    case "/barcode/create/:productId":
      link1 = createLink("Products");
      link2 = createLink("Product");
      text = createText("Barcode");
      break;

    case "/barcode/create/:storageId":
      link1 = createLink("Storage");
      text = createText("Barcode");
      break;

    case "/barcode/create/:storageId/:rackId":
      link1 = createLink("Storage");
      link2 = createLink("Rack");
      text = createText("Barcode");
      break;

    case "/barcode/create/:storageId/:rackId/:shelfId":
      link1 = createLink("Storage");
      link2 = createLink("Rack");
      link3 = createLink("Shelf");
      text = createText("Barcode");
      break;

    case "/barcode/create/:storageId/:rackId/:shelfId/:shelfSpotId":
      link1 = createLink("Storage");
      link2 = createLink("Rack");
      link3 = createLink("Shelf");
      link4 = createLink("Shelf Spot");
      text = createText("Barcode");
      break;

    default:
      break;
  }

  return (
    <nav aria-label="breadcrumb " className="pb-0 site-breadcrumb">
      <ol className="breadcrumb">
        {link1}
        {link2}
        {link3}
        {link4}
        {link5}
        {text}
      </ol>
    </nav>
  );
};

export default withRouter(BreadCrumb);
