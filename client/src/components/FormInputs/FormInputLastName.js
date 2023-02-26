import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import FormErrors from "../Forms/FormErrors";
import PropTypes from "prop-types";

export default function FormInputLastName({ value, onChange, formErrors }) {
  return (
    <span className="wrapper">
      <span className="input_icon">
        <FontAwesomeIcon icon={faUser} />
      </span>
      <input
        id="user-last-name"
        type="text"
        value={value}
        onChange={onChange}
        name="lastName"
        placeholder="Прізвище"
      />
      <FormErrors
        formErrors={formErrors}
        name="lastName"
      />
    </span>
  );
}

FormInputLastName.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  formErrors: PropTypes.object,
};
