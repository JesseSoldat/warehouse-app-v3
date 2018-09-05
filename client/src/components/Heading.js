import React from "react";

// utils
import capitalizeEachWordOfString from "../utils/stringManipulation/capitalizeEachWordOfString";

const Heading = ({ title }) => {
  return (
    <div className="row mb-3">
      <div className="col-12 text-center">
        <h1
          className="pb-2 d-block d-sm-none"
          style={{ fontWeight: "lighter" }}
        >
          {title && capitalizeEachWordOfString(title)}
        </h1>
        <h1 className="display-4 pb-2 d-none d-sm-block">
          {title && capitalizeEachWordOfString(title)}
        </h1>
      </div>
    </div>
  );
};

export default Heading;
