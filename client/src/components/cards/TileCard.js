import React from "react";
import { Link } from "react-router-dom";

const TileCard = ({ title, subtitle, link, linkText }) => {
  return (
    <div
      className="card mr-1 ml-1 mb-3 col-xs-12 col-md-5 col-lg-3"
      style={{ minHeight: "11rem" }}
    >
      <div className="card-body d-flex flex-column align-items-center">
        <h5 className="card-title text-center pt-2">{title}</h5>
        <p className="card-text">{subtitle}</p>
        <Link to={link}>{linkText}</Link>
      </div>
    </div>
  );
};

export default TileCard;
