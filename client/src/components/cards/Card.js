import React from "react";
import { Link } from "react-router-dom";

// common components
import IconBtn from "../buttons/IconBtn";
// utils
import truncateStr from "../../utils/stringManipulation/truncateStr";

const Card = ({ data, cardSize = "240px" }) => {
  const {
    id = "",
    title = "",
    subtitle = "",
    link1 = "",
    link2 = "",
    linkText1 = "",
    linkText2 = "",
    cb1Text = "",
    cb2Text = "",
    cb1 = null,
    cb2 = null
  } = data;
  return (
    <div className="card mb-4" style={{ width: cardSize, height: "150px" }}>
      <div className="card-body d-flex flex-column justify-content-center align-items-center">
        <h6 className="card-title">{truncateStr(title, 25)}</h6>
        {subtitle && <h6 className="card-subtitle mb-2">{subtitle}</h6>}

        {link1 && (
          <div className="d-flex justify-content-between mt-4">
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

export default Card;
