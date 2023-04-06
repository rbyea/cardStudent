import React from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
  const toggleClassName = () => {
    return `form-control ${error ? "is-invalid" : ""}`;
  };

  return (
    <div className="input-group mb-3">
      <label className="label-form">
        <span>{label}</span>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={toggleClassName()}
          name={name}
          placeholder={label}
        />
        {error ? <div className="invalid-feedback">{error}</div> : <></>}
      </label>
    </div>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default TextField;
