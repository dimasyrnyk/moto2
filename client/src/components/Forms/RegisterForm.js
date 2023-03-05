import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import FormInputEmail from "../FormInputs/FormInputEmail";
import FormInputFirstName from "../FormInputs/FormInputFirstName";
import FormInputLastName from "../FormInputs/FormInputLastName";
import FormInputPass from "../FormInputs/FormInputPass";
import FormInputPassConfirm from "../FormInputs/FormInputPassConfirm";
import FormInputPhone from "../FormInputs/FormInputPhone";
import { userSignUp } from "./../../store/activeuser/actions";
import { AppLoader } from "../AppLoader/AppLoader";
import Alert from "../Alert/Alert";

export default function RergisterForm({ setValue }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    confirm: "",
    firstName: "",
  });
  const [formValid, setFormValid] = useState({
    emailValid: false,
    passwordValid: false,
    confirmValid: false,
    firstNameValid: false,
    lastNameValid: false,
    phoneValid: false,
    allValid: false,
  });
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);

  const handleUserInput = (e) => {
    setForm(
      { ...form, [e.target.name]: e.target.value },
      validateField(e.target.name, e.target.value)
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: form.email.toLowerCase(),
      password: form.password,
      firstname: form.firstName,
      lastname: form.lastName,
      phone: form.phone,
      avatar: "https://img.freepik.com/free-icon/user_318-159711.jpg?w=360",
    };
    dispatch(userSignUp(newUser));
  };

  const modalChange = () => {
    if (app.alertMessage.color === "alert_green") {
      setTimeout(() => {
        setValue("login");
      }, 4000);
    }
  };

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = formErrors;
    let emailValid = formValid.emailValid;
    let passwordValid = formValid.passwordValid;
    let confirmValid = formValid.confirmValid;
    let firstNameValid = formValid.firstNameValid;
    let lastNameValid = formValid.lastNameValid;
    let phoneValid = formValid.phoneValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " не коректний";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " закороткий";
        break;
      case "confirm":
        confirmValid = form.password === value;
        fieldValidationErrors.confirm = confirmValid ? "" : " пароль";
        break;
      case "firstName":
        firstNameValid = value.match(/^([\w.%+-]{3,20})$/i);
        fieldValidationErrors.firstName = firstNameValid ? "" : " закоротке";
        break;
      case "lastName":
        lastNameValid = value.match(/^([\w.%+-]{3,20})$/i);
        fieldValidationErrors.lastName = lastNameValid ? "" : " закоротка";
        break;
      case "phone":
        phoneValid = value.match(/^([\w.%+-]{3,20})$/i);
        fieldValidationErrors.phone = phoneValid ? "" : " не коректний";
        break;
      default:
        break;
    }
    setFormErrors(fieldValidationErrors);
    setFormValid(
      {
        emailValid: emailValid,
        passwordValid: passwordValid,
        confirmValid: confirmValid,
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid,
        phoneValid: phoneValid,
      },
      validateForm()
    );
  };

  const validateForm = () => {
    setFormValid({
      ...formValid,
      allValid:
        formValid.emailValid &&
        formValid.passwordValid &&
        formValid.confirmValid &&
        formValid.firstNameValid &&
        formValid.lastNameValid &&
        formValid.phoneValid,
    });
  };

  if (app.loading) return <AppLoader />;

  return (
    <>
      {app.alertMessage && <Alert onChange={modalChange()} />}
      <div className="login_form login_form_size">
        <h4 className="modal__title">Реєстрація</h4>
        <form>
          <fieldset>
            <FormInputEmail
              value={form.email}
              onChange={handleUserInput}
              formErrors={formErrors}
            />
            <FormInputPass
              value={form.password}
              onChange={handleUserInput}
              formErrors={formErrors}
            />
            <FormInputPassConfirm
              value={form.confirm}
              onChange={handleUserInput}
              formErrors={formErrors}
            />
            <FormInputFirstName
              value={form.firstName}
              onChange={handleUserInput}
              formErrors={formErrors}
            />
            <FormInputLastName
              value={form.lastName}
              onChange={handleUserInput}
              formErrors={formErrors}
            />
            <FormInputPhone
              value={form.phone}
              onChange={handleUserInput}
              formErrors={formErrors}
            />
            <p>
              <input
                className="button button_form"
                type="submit"
                onClick={onSubmit}
                value="Зареєструватись"
              />
            </p>
          </fieldset>
        </form>
        <div className="login_form_nav">
          <span>Вже є профіль?</span>
          <button
            className="login_form_nav_btn"
            onClick={() => setValue("login")}
          >
            Вхід до профілю
          </button>
        </div>
      </div>
    </>
  );
}

RergisterForm.propTypes = {
  app: PropTypes.object,
  userSignUp: PropTypes.func,
};
