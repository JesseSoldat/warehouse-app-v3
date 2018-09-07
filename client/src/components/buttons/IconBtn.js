import React from "react";

const IconBtn = ({ btnClass, iconClass, text, cb }) => {
  return (
    <button className={`btn ${btnClass}`} onClick={cb}>
      <i className={`far ${iconClass} mr-2`} /> {text}
    </button>
  );
};

export default IconBtn;
