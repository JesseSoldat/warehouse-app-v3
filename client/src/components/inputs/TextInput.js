import React from "react";
import PropTypes from "prop-types";

const TextInput = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  const inputClass = error
    ? "form-control form-control-lg mb-2 is-invalid"
    : "form-control form-control-lg mb-2";
  return (
    <div>
      {label && (
        <label className="p-0 m-0 pl-1">
          <small>{label}</small>
        </label>
      )}
      <input
        className={inputClass}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        disabled={disabled}
        value={value}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextInput.defaultProps = {
  type: "text"
};

export default TextInput;
