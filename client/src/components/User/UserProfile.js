import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import "./UserProfile.scss";
import {
  userSignOut,
  userActiveLoadData,
} from "./../../store/activeuser/actions";

export default function UserProfile() {
  const activeUser = useSelector((state) => state.activeUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!activeUser.info.hasOwnProperty("email")) {
      dispatch(userActiveLoadData(activeUser));
    }
  }, [activeUser, dispatch]);

  const signOut = () => {
    dispatch(userSignOut());
    localStorage.removeItem("activeUser");
  };

  return (
    <div className="user-page__container">
      <h3>{activeUser.info.firstname + " " + activeUser.info.lastname}</h3>
      <span className="user-page__second-row">
        <img
          src={activeUser.info.avatar}
          alt="Avatar"
          className="user-page__avatar"
        />
        <span className="user-page__contacts">
          <p>Контактні дані</p>
          <p>{activeUser.info.email}</p>
          <p>{activeUser.info.phone}</p>
        </span>
      </span>
      <p>Мій кошик</p>
      <p>Мої замовлення</p>
      <Link
        to="/"
        className="login_form_nav_btn"
        onClick={signOut}
      >
        Вийти з профілю
      </Link>
    </div>
  );
}

UserProfile.propTypes = {
  activeUser: PropTypes.object,
  userActiveLoadData: PropTypes.func,
  userSignOut: PropTypes.func,
};
