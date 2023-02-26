import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import FormErrors from "../Forms/FormErrors";
import PropTypes from "prop-types";

export default function FormInputPass({ value, onChange, formErrors }) {
  return (
    <span className="wrapper">
      <span className="input_icon">
        <FontAwesomeIcon icon={faLock} />
      </span>
      <input
        id="user-password"
        type="password"
        value={value}
        onChange={onChange}
        name="password"
        placeholder="Пароль"
      />
      <FormErrors formErrors={formErrors} name="password" />
    </span>
  );
}

FormInputPass.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  formErrors: PropTypes.object,
};
