import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import FormInputEmail from "../FormInputs/FormInputEmail";
import FormInputPass from "../FormInputs/FormInputPass";
import { userSignIn } from "./../../store/activeuser/actions";
import { AppLoader } from "../AppLoader/AppLoader";
import Alert from "../Alert/Alert";

export default function LoginForm({ setValue, onModalClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(userSignIn({ email, password }));
  };

  const modalClose = () => {
    if (app.alertMessage.color === "alert_green") {
      setTimeout(() => {
        onModalClose(false);
      }, 3000);
    }
  };

  if (app.loading) return <AppLoader />;

  return (
    <>
      {app.alertMessage && <Alert onChange={modalClose()} />}
      <div className="login_form login_form_size">
        <h3 className="modal__title">Вхід до профілю</h3>
        <form>
          <fieldset>
            <FormInputEmail
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              formErrors={{}}
            />
            <FormInputPass
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              formErrors={{}}
            />
            <p>
              <input
                className="button button_form"
                type="submit"
                onClick={onSubmit}
                value="Увійти"
              />
            </p>
          </fieldset>
        </form>
        <div className="login_form_nav">
          <button
            className="login_form_nav_btn"
            onClick={() => setValue("forgotpass")}
          >
            Забули пароль?
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

LoginForm.propTypes = {
  app: PropTypes.object,
  userSignIn: PropTypes.func,
};
