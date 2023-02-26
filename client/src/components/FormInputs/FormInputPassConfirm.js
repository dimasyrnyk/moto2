import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import FormErrors from "../Forms/FormErrors";
import PropTypes from "prop-types";

export default function FormInputPassConfirm({ value, onChange, formErrors }) {
  return (
    <span className="wrapper">
      <span className="input_icon">
        <FontAwesomeIcon icon={faLock} />
      </span>
      <input
        id="user-password-confirm"
        type="password"
        value={value}
        onChange={onChange}
        name="confirm"
        placeholder="Підтвердження паролю"
      />
      <FormErrors formErrors={formErrors} name="confirm" />
    </span>
  );
}

FormInputPassConfirm.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  formErrors: PropTypes.object,
};
