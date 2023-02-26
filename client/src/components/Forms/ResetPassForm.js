import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import FormInputPass from "../FormInputs/FormInputPass";
import FormInputPassConfirm from "../FormInputs/FormInputPassConfirm";
import { userResetPassword } from "./../../store/users/actions";
import { AppLoader } from "../AppLoader/AppLoader";
import Alert from "../Alert/Alert";

export default function ResetPassForm({ setValue }) {
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [formErrors, setFormErrors] = useState({ password: "", confirm: "" });
  const [formValid, setFormValid] = useState({
    passwordValid: false,
    confirmValid: false,
    allValid: false,
  });
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.users.resetPass.userId);
  const status = useSelector((state) => state.users.resetPass.status);
  const app = useSelector((state) => state.app);

  const handleUserInput = (e) => {
    setForm(
      { ...form, [e.target.name]: e.target.value },
      validateField(e.target.name, e.target.value)
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      userResetPassword({
        id: userId,
        password: form.password,
      })
    );
  };

  const modalChange = () => {
    if (status) {
      setTimeout(() => {
        setValue("login");
      }, 3000);
    }
  };

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = formErrors;
    let passwordValid = formValid.passwordValid;
    let confirmValid = formValid.confirmValid;

    switch (fieldName) {
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " закороткий";
        break;
      case "confirm":
        confirmValid = form.password === value;
        fieldValidationErrors.confirm = confirmValid ? "" : " пароль";
        break;
      default:
        break;
    }
    setFormErrors(fieldValidationErrors);
    setFormValid(
      { passwordValid: passwordValid, confirmValid: confirmValid },
      validateForm()
    );
  };

  const validateForm = () => {
    setFormValid({
      ...formValid,
      allValid: formValid.passwordValid && formValid.confirmValidd,
    });
  };

  if (app.loading) return <AppLoader />;

  return (
    <>
      {app.alertMessage && <Alert onChange={modalChange()} />}
      <div className="login_form login_form_size">
        <h4 className="modal__title">Зміна паролю</h4>
        <form>
          <fieldset>
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
            <p>
              <input
                className="button button_form"
                type="submit"
                onClick={onSubmit}
                value="Змінити пароль"
                disabled={!formValid.passwordValid || !formValid.confirmValid}
              />
            </p>
          </fieldset>
        </form>
        <div className="login_form_nav">
          <button
            className="login_form_nav_btn"
            onClick={() => setValue("login")}
          >
            Вхід до профілю
          </button>
          <button
            className="login_form_nav_btn"
            onClick={() => setValue("register")}
          >
            Реєстрація
          </button>
        </div>
      </div>
    </>
  );
}

ResetPassForm.propTypes = {
  userId: PropTypes.string,
  status: PropTypes.bool,
  app: PropTypes.object,
  userResetPassword: PropTypes.func,
};
