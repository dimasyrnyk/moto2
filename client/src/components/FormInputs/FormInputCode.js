import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import FormErrors from "../Forms/FormErrors";
import PropTypes from "prop-types";

export default function FormInputCode({ value, onChange, formErrors }) {
  return (
    <span className="wrapper">
      <span className="input_icon">
        <FontAwesomeIcon icon={faLock} />
      </span>
      <input
        id="user-code"
        type="text"
        value={value}
        onChange={onChange}
        name="phone"
        placeholder="Введіть код"
      />
      <FormErrors formErrors={formErrors} name="code" />
    </span>
  );
}

FormInputCode.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  formErrors: PropTypes.object,
};
