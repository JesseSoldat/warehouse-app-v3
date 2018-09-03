import React from "react";
import { Link } from "react-router-dom";

// helpers
import getLinkUrls from "./linkUrls";

const DropdownLink = ({ text, url = null, icon = null }) => {
  const linkUrl = url ? url : getLinkUrls(text);

  const createIcon = () => <i className={`fa ${icon} mr-2`} />;

  return (
    <Link className="dropdown-item" to={linkUrl}>
      {icon && createIcon()}
      {text}
    </Link>
  );
};

export default DropdownLink;
