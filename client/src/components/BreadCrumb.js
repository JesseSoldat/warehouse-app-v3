import React from "react";
import { withRouter, Link } from "react-router-dom";

const BreadCrumb2 = ({ match }) => {
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

  let link1, link2, link3, link4, link5, link6, text;

  const createLink = (link, url) => (
    <li className="breadcrumb-item">
      <Link to={url}>{link}</Link>
    </li>
  );

  const createText = text => <li className="breadcrumb-item">{text}</li>;

  switch (path) {
    // GENERAL ROUTES
    case "/dashboard":
      text = createText("Welcome");
      break;

    // ADMIN ROUTES
    case "/admin/manageUsers":
      link1 = createLink("Dashboard", "/dashboard");
      text = createText("Admin");
      break;

    case "/admin/playGround":
      link1 = createLink("Dashboard", "/dashboard");
      text = createText("Playground");
      break;

    // PRODUCT ROUTES
    case "/products/search":
      link1 = createLink("Dashboard", "/dashboard");
      text = createText("Search");
      break;

    case "/products/:productId":
      link1 = createLink("Products", "/products/search");
      text = createText("Details");
      break;

    case "/products/edit/:productId":
      link1 = createLink("Products", "/products/search");
      link2 = createLink("Details", `/products/${productId}`);
      text = createText("Edit");
      break;

    case "/products/create":
      link1 = createLink("Products", "/products/search");
      text = createText("Create");
      break;

    // PRODUCERS ROUTES
    case "/producers/search":
      link1 = createLink("Dashboard", "/dashboard");
      text = createText("Search");
      break;

    case "/producers/:producerId":
      link1 = createLink("Producers", "/producers/search");
      text = createText("Details");
      break;

    case "/producers/edit/:producerId":
      link1 = createLink("Producers", "/producers/search");
      link2 = createLink("Details", `/producers/${producerId}`);
      text = createText("Edit");
      break;

    case "/producers/create":
      link1 = createLink("Producers", "/producers/search");
      text = createText("Create");
      break;

    // CUSTOMERS ROUTES
    case "/customers/search":
      link1 = createLink("Dashboard", "/dashboard");
      text = createText("Search");
      break;

    case "/customers/:customerId":
      link1 = createLink("Customers", "/customers/search");
      text = createText("Details");
      break;

    case "/customers/edit/:customerId":
      link1 = createLink("Customers", "/customers/search");
      link2 = createLink("Details", `/customers/${customerId}`);
      text = createText("Edit");
      break;

    case "/customers/create":
      link1 = createLink("Customers", "/customers/search");
      text = createText("Create");
      break;

    // STORAGES ROUTES ---------------------------------------------
    case "/storages":
      link1 = createLink("Dashboard", "/dashboard");
      text = createText("Search");
      break;

    case "/storages/search":
      link1 = createLink("Dashboard", "/dashboard");
      text = createText("Search");
      break;

    // STORAGE DETAILS
    case "/storage/:storageId":
      link1 = createLink("Storages", "/storages");
      text = createText("Storage");
      break;

    case "/rack/:storageId/:rackId":
      link1 = createLink("Storages", "/storages");
      link2 = createLink("Storage", `/storage/${storageId}`);
      text = createText("Rack");
      break;

    case "/shelf/:storageId/:rackId/:shelfId":
      link1 = createLink("Storages", "/storages");
      link2 = createLink("Storage", `/storage/${storageId}`);
      link3 = createLink("Rack", `/rack/${storageId}/${rackId}?type=rack`);
      text = createText("Shelf");
      break;

    case "/shelfSpot/:storageId/:rackId/:shelfId/:shelfSpotId":
      link1 = createLink("Storages", "/storages");
      link2 = createLink("Storage", `/storage/${storageId}`);
      link3 = createLink("Rack", `/rack/${storageId}/${rackId}?type=rack`);
      link4 = createLink(
        "Shelf",
        `/shelf/${storageId}/${rackId}/${shelfId}?type=shelf`
      );
      text = createText("ShelfSpot");
      break;

    case "/box/:boxId":
      link1 = createLink("Store", "/barcode/scan?type=linkBoxToSpot");
      text = createText("Box");
      break;

    case "/box/:storageId/:rackId/:shelfId/:shelfSpotId/:boxId":
      link2 = createLink("Storage", `/storage/${storageId}`);
      link3 = createLink("Rack", `/rack/${storageId}/${rackId}?type=rack`);
      link4 = createLink(
        "Shelf",
        `/shelf/${storageId}/${rackId}/${shelfId}?type=shelf`
      );
      link5 = createLink(
        "ShelfSpot",
        `/shelf/${storageId}/${rackId}/${shelfId}/${shelfSpotId}?type=shelfSpot`
      );
      text = createText("Box");
      break;

    // STORAGE CREATE
    case "/storage/create":
      link1 = createLink("Storages", "/storages");
      text = createText("Create");
      break;

    case "/rack/create/:storageId":
      link1 = createLink("Storages", "/storages");
      link2 = createLink("Storage", `/storage/${storageId}`);
      text = createText("Create");
      break;

    case "/shelf/create/:storageId/:rackId":
      link1 = createLink("Storages", "/storages");
      link2 = createLink("Storage", `/storage/${storageId}`);
      link3 = createLink("Rack", `/rack/${storageId}/${rackId}?type=rack`);
      text = createText("Create");
      break;

    case "/shelfSpot/create/:storageId/:rackId/:shelfId":
      link1 = createLink("Storages", "/storages");
      link2 = createLink("Storage", `/storage/${storageId}`);
      link3 = createLink("Rack", `/rack/${storageId}/${rackId}?type=rack`);
      link4 = createLink(
        "Shelf",
        `/shelf/${storageId}/${rackId}/${shelfId}?type=shelf`
      );
      text = createText("Create");
      break;

    case "/box/create":
      link1 = createLink("Storages", "/storages");
      text = createText("Create");
      break;

    // STORAGE EDIT
    case "/storage/edit/:storageId":
      link1 = createLink("Storages", "/storages");
      link2 = createLink("Storage", `/storage/${storageId}`);
      text = createText("Edit");
      break;

    case "/rack/edit/:storageId/:rackId":
      link1 = createLink("Storages", "/storages");
      link2 = createLink("Storage", `/storage/${storageId}`);
      link3 = createLink("Rack", `/rack/${storageId}/${rackId}?type=rack`);
      text = createText("Edit");
      break;

    case "/shelf/edit/:storageId/:rackId/:shelfId":
      link1 = createLink("Storages", "/storages");
      link2 = createLink("Storage", `/storage/${storageId}`);
      link3 = createLink("Rack", `/rack/${storageId}/${rackId}?type=rack`);
      link4 = createLink(
        "Shelf",
        `/shelf/${storageId}/${rackId}/${shelfId}?type=shelf`
      );
      text = createText("Edit");
      break;

    case "/shelfSpot/edit/:storageId/:rackId/:shelfId/:shelfSpotId":
      link1 = createLink("Storages", "/storages");
      link2 = createLink("Storage", `/storage/${storageId}`);
      link3 = createLink("Rack", `/rack/${storageId}/${rackId}?type=rack`);
      link4 = createLink(
        "Shelf",
        `/shelf/${storageId}/${rackId}/${shelfId}?type=shelf`
      );
      link5 = createLink(
        "ShelfSpot",
        `/shelfSpot/${storageId}/${rackId}/${shelfId}/${shelfSpotId}?type=shelfSpot`
      );
      text = createText("Edit");
      break;

    // No location
    case "/box/edit/:boxId":
      link1 = createLink("Box", `/box/${boxId}?type=box`);
      text = createText("Edit");
      break;

    // have location
    case "/box/edit/:storageId/:rackId/:shelfId/:shelfSpotId/:boxId":
      link1 = createLink("Storage", `/storage/${storageId}`);
      link2 = createLink("Rack", `/rack/${storageId}/${rackId}?type=rack`);
      link3 = createLink(
        "Shelf",
        `/shelf/${storageId}/${rackId}/${shelfId}?type=shelf`
      );
      link4 = createLink(
        "ShelfSpot",
        `/shelfSpot/${storageId}/${rackId}/${shelfId}/${shelfSpotId}?type=shelfSpot`
      );
      link5 = createLink(
        "Box",
        `/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=box`
      );
      text = createText("Edit");
      break;

    // BARCODE ROUTES ------------------------------------------
    case "/barcode/scan":
      link1 = createLink("Dashboard", "/dashboard");
      text = createText("Search");
      break;

    case "/barcode/create":
      link1 = createLink("Dashboard", "/dashboard");
      text = createText("Search");
      break;

    default:
      break;
  }

  return (
    <nav aria-label="breadcrumb" className="pb-0">
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

export default withRouter(BreadCrumb2);
