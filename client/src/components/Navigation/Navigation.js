import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faShoppingCart,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import LoginModal from "../../components/LoginModal/LoginModal";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const activeUser = useSelector((state) => state.activeUser);
  const btnRef = useRef();
  const phoneRef = useRef();

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside, false);
      return function cleanup() {
        document.removeEventListener("click", handleClickOutside, false);
      };
    }
  });

  const handleClickOutside = (e) => {
    if (!e.target.parentNode.contains(btnRef.current)) {
      if (!e.target.parentNode.contains(phoneRef.current)) {
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      <nav className="header__menu">
        <label
          className="header__menu__btn"
          htmlFor="menu__btn__checkbox"
          ref={btnRef}
        >
          <FontAwesomeIcon icon={faBars} />
        </label>
        <input
          id="menu__btn__checkbox"
          type="checkbox"
          name="menu__btn__checkbox"
          onChange={() => setIsOpen(!isOpen)}
          checked={isOpen}
        />
        <ul className="header__menu__list">
          <li>
            <Link to="/">Магазин</Link>
          </li>
          <li>
            <Link to="/partners">Партнерам</Link>
          </li>
          <li>
            <Link to="/delivery">Доставка і оплата</Link>
          </li>
          <li>
            <Link to="/returns">Повернення</Link>
          </li>
          <li>
            <Link to="/aboutus">Про нас</Link>
          </li>
          <li>
            <Link to="/contacts">Контакти</Link>
          </li>
          <span
            className="header__menu__phones"
            ref={phoneRef}
          >
            <p>+38 (096) 938 98 46</p>
            <p>+38 (096) 938 98 46</p>
          </span>
        </ul>
        <Link
          to="/cart"
          className="profile__btn-mobile"
        >
          <FontAwesomeIcon
            icon={faShoppingCart}
            onClick={() => setIsOpen(false)}
          />
        </Link>
        <LoginModal
          classes={"profile__btn-mobile"}
          onBtnClick={() => setIsOpen(false)}
        />
        {activeUser.info.roles.includes("ADMIN") && (
          <Link
            to="/add/new-product"
            className="profile__btn-mobile"
          >
            <FontAwesomeIcon icon={faPlusSquare} />
          </Link>
        )}
      </nav>
    </>
  );
}

Navigation.propTypes = {
  activeUser: PropTypes.object,
};
