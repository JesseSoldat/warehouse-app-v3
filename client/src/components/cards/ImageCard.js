import React from "react";
import { Link } from "react-router-dom";

// common components
import IconBtn from "../buttons/IconBtn";
// utils
import truncateStr from "../../utils/stringManipulation/truncateStr";

const ImageCard = ({ data, cardSize = "240px" }) => {
  const {
    id = "",
    title = "",
    picture = "",
    subtitle = "",
    link1 = "",
    link2 = "",
    linkText1 = "",
    linkText2 = "",
    cb1Text = "",
    cb2Text = "",
    cb1 = null,
    cb2 = null,
    showPic = true,
    picSrc = "http://via.placeholder.com/150x100"
  } = data;
  return (
    <div className="card mb-3" style={{ width: cardSize, height: "330px" }}>
      {showPic && (
        <img
          className="card-img-top"
          alt="product"
          src={picture ? picture : picSrc}
          style={{
            width: "90%",
            height: "100%",
            maxHeight: "200px",
            margin: "10px auto",
            border: "1px solid black",
            boxSizing: "border-box"
          }}
        />
      )}
      <div className="card-body d-flex flex-column align-items-center pt-1 mb-3">
        <h6 className="card-title">{truncateStr(title, 25)}</h6>
        {subtitle && <h6 className="card-subtitle mb-2">{subtitle}</h6>}

        {link1 && (
          <div className="d-flex justify-content-between mt-2">
            {link1 && (
              <Link className="card-link" to={link1}>
                <IconBtn
                  btnClass="btn-default"
                  iconClass="fa-eye mr-1"
                  text={linkText1}
                />
              </Link>
            )}

            {link2 && (
              <Link className="card-link" to={link2}>
                <IconBtn
                  btnClass="btn-default"
                  iconClass="fa-edit mr-1"
                  text={linkText2}
                />
              </Link>
            )}
          </div>
        )}

        <div>
          <div className="d-flex justify-content-between">
            {cb1Text && (
              <button
                onClick={e => cb1(id, e)}
                className="btn btn-default mr-2"
              >
                {cb1Text}
              </button>
            )}

            {cb2Text && (
              <button
                onClick={e => cb2(id, e)}
                className="btn btn-default ml-2"
              >
                {cb2Text}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
