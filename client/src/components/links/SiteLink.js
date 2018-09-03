import React from "react";
import { Link } from "react-router-dom";

// helpers
import getLinkUrls from "./linkUrls";

const SiteLink = ({ text, url = null, linkCss = null, icon = null }) => {
  const linkUrl = url ? url : getLinkUrls(text);

  const createIcon = () => <i className={`fa ${icon} mr-2`} />;

  return (
    <Link className={linkCss} to={linkUrl}>
      {icon && createIcon()}
      {text}
    </Link>
  );
};

export default SiteLink;
