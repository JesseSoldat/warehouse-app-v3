import React from "react";

// components
import SingleField from "./SingleField";

const SingleFieldList = ({ data, listCss = "col-md-6" }) => {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className={`col-xs-12 ${listCss} ml-mr-auto`}>
          <ul className="list-group list-group-flush">
            {data.length &&
              data.map(({ label, value }, i) => (
                <SingleField key={i} label={label} value={value} />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleFieldList;
