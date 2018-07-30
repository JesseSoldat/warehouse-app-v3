import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import capitalizeFirstLetter from "../utils/stringManipulation/capitalizeFirstLetter";

// idTypesArray is passed in with a list of all :id types to check for
const BreadCrumb = ({ location, match, idTypesArray = [":id"] }) => {
  const paths = match.path.split("/");

  const type = location.search;

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
              return "Welcome to SaRA";
            }
            return (
              <li key={`bread${i}dash`} className="breadcrumb-item">
                <Link to={`/dashboard`}>Dashboard</Link>
              </li>
            );
          } else if (path === "edit") {
            return (
              <Fragment key={`bread${i}mode`}>
                <li className="breadcrumb-item">
                  <Link
                    to={`/${paths[1]}/${id}${
                      paths[1] === "storages" ? type : ""
                    }`}
                  >{`${capitalizeFirstLetter(paths[1].slice(0, -1))}`}</Link>
                </li>
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
