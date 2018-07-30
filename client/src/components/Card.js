import React from "react";
import { Link } from "react-router-dom";

import truncateStr from "../utils/stringManipulation/truncateStr";

const Card = ({ data }) => {
  const {
    title = "",
    picture = "",
    subtitle = "",
    link1 = "",
    link2 = "",
    linkText1 = "",
    linkText2 = "",
    showPic = true,
    picSrc = "http://via.placeholder.com/150x100"
  } = data;
  return (
    <div className="card mb-3" style={{ width: "240px" }}>
      {showPic && (
        <img
          className="card-img-top"
          alt="product"
          src={picture ? picture : picSrc}
          style={{
            width: "90%",
            height: "200px",
            margin: "10px auto",
            border: "1px solid black",
            boxSizing: "border-box"
          }}
        />
      )}
      <div className="card-body d-flex flex-column align-items-center pt-1 mb-3">
        <h6 className="card-title">{truncateStr(title, 25)}</h6>
        {subtitle && <h6 className="card-subtitle mb-2">{subtitle}</h6>}

        <div className="d-flex justify-content-between mt-2">
          <Link className="card-link" to={link1}>
            <button className="btn btn-default">{linkText1}</button>
          </Link>

          {link2 && (
            <Link className="card-link" to={link2}>
              <button className="btn btn-default">{linkText2}</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
