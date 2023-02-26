import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import FormErrors from "../Forms/FormErrors";
import PropTypes from "prop-types";

export default function FormInputPhone({ value, onChange, formErrors }) {
  return (
    <span className="wrapper">
      <span className="input_icon">
        <FontAwesomeIcon icon={faPhone} />
      </span>
      <input
        id="user-phone"
        type="text"
        value={value}
        onChange={onChange}
        name="phone"
        placeholder="Номер телефону"
      />
      <FormErrors formErrors={formErrors} name="phone" />
    </span>
  );
}

FormInputPhone.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  formErrors: PropTypes.object,
};
