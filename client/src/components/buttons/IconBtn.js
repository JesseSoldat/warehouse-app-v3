import React from "react";

const IconBtn = ({
  btnClass,
  iconClass,
  text,
  cb = () => {},
  disabled = false,
  type = "button"
}) => {
  return (
    <button
      className={`btn ${btnClass}`}
      onClick={cb}
      disabled={disabled}
      type={type}
    >
      <i className={`fa ${iconClass} mr-2`} /> {text}
    </button>
  );
};

export default IconBtn;
