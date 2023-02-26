import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { userConfirm, userConfirmEmail } from "./../../store/users/actions";
import FormInputEmail from "../FormInputs/FormInputEmail";
import FormInputCode from "../FormInputs/FormInputCode";
import { AppLoader } from "../AppLoader/AppLoader";
import Alert from "../Alert/Alert";

export default function ForgotPassForm({ setValue }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const resetPass = useSelector((state) => state.users.resetPass);
  const app = useSelector((state) => state.app);

  const onSubmitEmail = (e) => {
    e.preventDefault();
    dispatch(userConfirm({ email }));
  };

  const onSubmitCode = (e) => {
    e.preventDefault();
    dispatch(userConfirmEmail({ id: resetPass.userId, code }));
  };

  const modalChange = () => {
    if (resetPass.confirmEmail) {
      setTimeout(() => {
        setValue("resetpass");
      }, 2500);
    }
  };

  if (app.loading) return <AppLoader />;

  return (
    <>
      {app.alertMessage && <Alert onChange={modalChange()} />}
      <div className="login_form login_form_size">
        <h4 className="modal__title">Відновлення паролю</h4>
        <form>
          <fieldset>
            <FormInputEmail
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              formErrors={{}}
            />
            <p>
              <input
                className="button button_form"
                type="submit"
                onClick={onSubmitEmail}
                value="Надіслати код"
              />
            </p>
            {resetPass.confirmUser && (
              <>
                <FormInputCode
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  formErrors={{}}
                />
                <p>
                  <input
                    className="button button_form"
                    type="submit"
                    onClick={onSubmitCode}
                    value="Підтвердити код"
                  />
                </p>
              </>
            )}
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

ForgotPassForm.propTypes = {
  app: PropTypes.object,
  resetPass: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  userConfirm: PropTypes.func,
  userConfirmEmail: PropTypes.func,
};
