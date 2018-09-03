import React from "react";
import { Link } from "react-router-dom";

// helpers
import getLinkUrls from "./linkUrls";

const MenuLink = ({ text, url = null, icon }) => {
  const linkUrl = url ? url : getLinkUrls(text);

  return (
    <Link
      className="dropdown-toggle"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      to={linkUrl}
    >
      <i className={`fas ${icon} mr-2`} />
      {text}
    </Link>
  );
};

export default MenuLink;
