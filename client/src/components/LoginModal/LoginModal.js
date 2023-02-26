import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import "./LoginModal.css";
import LoginForm from "../Forms/LoginForm";
import RegisterForm from "../Forms/RegisterForm";
import ForgotPassForm from "../Forms/ForgotPassForm";
import ResetPassForm from "../Forms/ResetPassForm";

export default function LoginModal({ classes }) {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [formNav, setFormNav] = useState("login");
  const activeUser = useSelector((state) => state.activeUser);

  const modalForm = Object.freeze({
    login: (
      <LoginForm
        setValue={setFormNav}
        onModalClose={setIsOpenLoginModal}
      />
    ),
    register: <RegisterForm setValue={setFormNav} />,
    forgotpass: <ForgotPassForm setValue={setFormNav} />,
    resetpass: <ResetPassForm setValue={setFormNav} />,
  });

  const onHandleClose = () => {
    setIsOpenLoginModal(false);
    setFormNav("login");
  };

  const onHandleOpen = () => {
    setIsOpenLoginModal(true);
  };

  if (activeUser.auth) {
    return (
      <>
        <Link
          to={`/profile/${activeUser.userId}`}
          className={classes}
        >
          <FontAwesomeIcon icon={faUser} />
          <span className={"profile__btn-title"}>Мій профіль</span>
        </Link>
      </>
    );
  }

  return (
    <>
      <span
        className={classes}
        onClick={onHandleOpen}
      >
        <FontAwesomeIcon icon={faUser} />
        <span className={"profile__btn-title"}>Мій профіль</span>
      </span>
      {isOpenLoginModal && (
        <div className="modal">
          <div className="modal__body">
            <button
              className="modal__close"
              onClick={onHandleClose}
            >
              X
            </button>
            {modalForm[formNav]}
          </div>
        </div>
      )}
    </>
  );
}

LoginModal.propTypes = {
  activeUser: PropTypes.object,
  classes: PropTypes.string.isRequired,
};
