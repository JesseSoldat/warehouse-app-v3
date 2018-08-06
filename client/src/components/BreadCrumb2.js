import React from "react";
import { withRouter, Link } from "react-router-dom";

import allRoutes from "../router/routes/allRoutes";

const BreadCrumb2 = ({ match }) => {
  const { params, path } = match;
  // console.log("path", path);
  console.log("params", params);

  let link1, link2, url1, url2, text;

  const routesObj = allRoutes[path];
  // console.log(routesObj);

  if (routesObj) {
    // set to default values
    url1 = routesObj.url1;
    url2 = routesObj.url2;

    // replace any of the params with the correct ids
    if (params) {
      if (routesObj.url1) {
        let url1Params = routesObj.url1.split(":")[1];
        if (url1Params) {
          // console.log("1", url1Params);
          const paramValue1 = params[url1Params];
          // console.log("1 value", paramValue1);
          url1 = routesObj.url1.split(":")[0] + paramValue1;
          // console.log("url 1", url1);
        }
      }
      if (routesObj.url2) {
        let url2Params = routesObj.url2.split(":")[1];
        if (url2Params) {
          // console.log("2", url2Params);
          const paramValue2 = params[url2Params];
          // console.log("2 value", paramValue2);
          url2 = routesObj.url2.split(":")[0] + paramValue2;
          // console.log("url 2", url2);
        }
      }
    }

    if (routesObj.link1) {
      link1 = (
        <li className="breadcrumb-item">
          <Link to={url1}>{routesObj.link1}</Link>
        </li>
      );
    }

    if (routesObj.link2) {
      link2 = (
        <li className="breadcrumb-item">
          <Link to={url2}>{routesObj.link2}</Link>
        </li>
      );
    }

    if (routesObj.text) {
      text = <li className="breadcrumb-item">{routesObj.text}</li>;
    }
  }

  return routesObj ? (
    <nav aria-label="breadcrumb" className="pb-0">
      <ol className="breadcrumb">
        {link1}
        {link2}
        {text}
      </ol>
    </nav>
  ) : null;
};

export default withRouter(BreadCrumb2);
