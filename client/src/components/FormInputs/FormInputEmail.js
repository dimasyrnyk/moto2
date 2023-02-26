import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import FormErrors from "../Forms/FormErrors";
import PropTypes from "prop-types";

export default function FormInputEmail({ value, onChange, formErrors }) {
  return (
    <span className="wrapper">
      <span className="input_icon">
        <FontAwesomeIcon icon={faEnvelope} />
      </span>
      <input
        id="user-email"
        type="text"
        value={value}
        onChange={onChange}
        name="email"
        placeholder="Email"
      />
      <FormErrors formErrors={formErrors} name="email" />
    </span>
  );
}

FormInputEmail.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  formErrors: PropTypes.object,
};
