import React from "react";
import { withRouter, Link } from "react-router-dom";

import allRoutes from "../router/routes/allRoutes";

const BreadCrumb2 = ({ match }) => {
  const { params, path } = match;
  const {
    productId,
    producerId,
    customerId,
    storageId,
    rackId,
    shelfId,
    shelfSpotId
  } = params;
  console.log("path", path);
  console.log("params", params);

  let link1, link2, link3, link4, url1, url2, url3, url4, text;

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

    // STORAGES ROUTES
    case "/storages":
      link1 = createLink("Dashboard", "/dashboard");
      text = createText("Search");
      break;

    case "/storages/search":
      link1 = createLink("Dashboard", "/dashboard");
      text = createText("Search");
      break;

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
      link3 = createLink("Rack", `/shelf/${storageId}/${rackId}`);
      text = createText("Shelf");
      break;

    case "/shelfSpot/:storageId/:rackId/:shelfId/:shelfSpotId":
      link1 = createLink("Storages", "/storages");
      link2 = createLink("Storage", `/storage/${storageId}`);
      link3 = createLink("Rack", `/shelf/${storageId}/${rackId}`);
      link4 = createLink(
        "Shelf",
        `/shelfSpot/${storageId}/${rackId}/${shelfId}`
      );
      text = createText("ShelfSpot");
      break;

    case "/storages/edit/:id":
      link1 = createLink("Storages", "/storages");
      link2 = createLink("Details", "/storages/:id");
      text = createText("Edit");
      break;

    case "/storages/create/:id":
      link1 = createLink("Storages", "/storages");
      text = createText("Create");
      break;

    // BARCODE ROUTES
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

  // if (routesObj) {
  //   // set to default values
  //   url1 = routesObj.url1;
  //   url2 = routesObj.url2;
  //   url3 = routesObj.url3;
  //   url4 = routesObj.url4;

  //   // replace any of the params with the correct ids
  //   if (params) {
  //     if (routesObj.url1) {
  //       let url1Params = routesObj.url1.split(":")[1];
  //       if (url1Params) {
  //         // console.log("1", url1Params);
  //         const paramValue1 = params[url1Params];
  //         // console.log("1 value", paramValue1);
  //         url1 = routesObj.url1.split(":")[0] + paramValue1;
  //         // console.log("url 1", url1);
  //       }
  //     }
  //     if (routesObj.url2) {
  //       let url2Params = routesObj.url2.split(":")[1];
  //       if (url2Params) {
  //         // console.log("2", url2Params);
  //         const paramValue2 = params[url2Params];
  //         // console.log("2 value", paramValue2);
  //         url2 = routesObj.url2.split(":")[0] + paramValue2;
  //         // console.log("url 2", url2);
  //       }
  //     }

  //     switch (routesObj.text) {
  //       case "Shelf":
  //         url3 = `/rack/${storageId}/${rackId}?type=rack`;
  //         break;

  //       case "ShelfSpot":
  //         url3 = `/rack/${storageId}/${rackId}?type=rack`;
  //         url4 = `/shelf/${storageId}/${rackId}/${shelfId}?type=shelf`;
  //         break;

  //       default:
  //         break;
  //     }
  //     // if (routesObj.url3) {
  //     //   const paramArray = routesObj.url3.split(":");
  //     //   console.log(paramArray);

  //     //   // A
  //     //   let url3ParamsA = routesObj.url3.split(":")[1];
  //     //   url3ParamsA = url3ParamsA.split("/")[0];

  //     //   let urlA = params[url3ParamsA];
  //     //   console.log("a", urlA);

  //     //   // B
  //     //   let url3ParamsB = routesObj.url3.split(":")[2];

  //     //   let urlB = params[url3ParamsB];

  //     //   console.log("b", urlB);
  //     // }
  //   }

  //   if (routesObj.link1) {
  //     link1 = (
  //       <li className="breadcrumb-item">
  //         <Link to={url1}>{routesObj.link1}</Link>
  //       </li>
  //     );
  //   }

  //   if (routesObj.link2) {
  //     link2 = (
  //       <li className="breadcrumb-item">
  //         <Link to={url2}>{routesObj.link2}</Link>
  //       </li>
  //     );
  //   }

  //   if (routesObj.link3) {
  //     link3 = (
  //       <li className="breadcrumb-item">
  //         <Link to={url3}>{routesObj.link3}</Link>
  //       </li>
  //     );
  //   }

  //   if (routesObj.link4) {
  //     link4 = (
  //       <li className="breadcrumb-item">
  //         <Link to={url4}>{routesObj.link4}</Link>
  //       </li>
  //     );
  //   }

  //   if (routesObj.text) {
  //     text = <li className="breadcrumb-item">{routesObj.text}</li>;
  //   }
  // }

  return (
    <nav aria-label="breadcrumb" className="pb-0">
      <ol className="breadcrumb">
        {link1}
        {link2}
        {link3}
        {link4}
        {text}
      </ol>
    </nav>
  );
};

export default withRouter(BreadCrumb2);
