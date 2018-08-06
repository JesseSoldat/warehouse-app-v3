import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// utils
import getUrlParameter from "../utils/getUrlParameter";
import capitalizeFirstLetter from "../utils/stringManipulation/capitalizeFirstLetter";

// idTypesArray is passed in with a list of all :id types to check for
const BreadCrumb = ({ location, match, idTypesArray = [":id"] }) => {
  const paths = match.path.split("/");
  console.log(match.path);

  // console.log("params", match.params);

  // console.log(paths);
  let joined = paths.join("/");
  // console.log(joined);

  const type = location.search;

  const storageType = getUrlParameter("type");

  let id;

  // use idTypesArray to match a specific ':id' type from the params
  idTypesArray.forEach(type => {
    const noColon = type.split(":")[1];
    if (match.params[noColon]) {
      id = match.params[noColon];
    }
  });

  return (
    <nav aria-label="breadcrumb" className="pb-0">
      <ol className="breadcrumb">
        {paths.map((path, i) => {
          if (i === 0) {
            return null;
          }

          if (idTypesArray.includes(path)) {
            return (
              <li key={`bread${i}dash`} className="breadcrumb-item">
                Details
              </li>
            );
          }

          if (paths.length === 2) {
            if (path === "dashboard") {
              return "Welcome to Warehouse App";
            }
            return (
              <li key={`bread${i}dash`} className="breadcrumb-item">
                <Link to={`/dashboard`}>Dashboard</Link>
              </li>
            );
          }
          // single is the route storages/single/:id
          else if (path === "single") {
            return null;
          } else if (path === "edit") {
            // default link to use
            let link = (
              <Link
                to={`/${paths[1]}/${id}${paths[1] === "storages" ? type : ""}`}
              >{`${capitalizeFirstLetter(storageType)}`}</Link>
            );

            // storage needs a special link to work correctly
            if (storageType === "storage") {
              link = <Link to={`/storages/single/${id}`}>Storage</Link>;
            }

            return (
              <Fragment key={`bread${i}mode`}>
                <li className="breadcrumb-item">{link}</li>
                <li key={`bread${i}`} className="breadcrumb-item">
                  {`${capitalizeFirstLetter(path)}`}
                </li>
              </Fragment>
            );
          } else if (
            path === "create" ||
            path === "search" ||
            path === "scan"
          ) {
            return (
              <li key={`bread${i}mode`} className="breadcrumb-item">
                {`${capitalizeFirstLetter(path)}`}
              </li>
            );
          } else {
            let linkUrl;
            if (path === "storages") linkUrl = `/${path}`;
            else if (path === "barcode") linkUrl = `/${path}/create`;
            else {
              linkUrl = `/${path}/search`;
            }

            return (
              <li key={`bread${i}root`} className="breadcrumb-item">
                <Link to={linkUrl}>{`${capitalizeFirstLetter(path)}`}</Link>
              </li>
            );
          }
        })}
      </ol>
    </nav>
  );
};

export default connect(
  null,
  null
)(withRouter(BreadCrumb));
