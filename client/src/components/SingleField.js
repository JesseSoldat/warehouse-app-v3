import React from "react";

// helpers
import isEmpty from "../utils/validation/isEmpty";

// field = used for label & the name in the case it is not set
// value = if the field has been save the data to show
const SingleField = ({ label, value }) =>
  isEmpty(value) ? (
    <li className="pb-3 list-group-item">
      <strong className="pr-3">{label}: </strong> {label} is not set yet
    </li>
  ) : (
    <li className="pb-3 list-group-item">
      <strong className="pr-3">{label}: </strong> {value}
    </li>
  );

export default SingleField;
