import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBars,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import "./Header.scss";
import CategoriesMenu from "../../components/Categories/Menu/CategoriesMenu";
import Navigation from "../../components/Navigation/Navigation";
import LoginModal from "../../components/LoginModal/LoginModal";
import Search from "../../components/Search/Search";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const activeUser = useSelector((state) => state.activeUser);
  const categoriesRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return function cleanup() {
      document.removeEventListener("click", handleClickOutside, false);
    };
  });

  const handleClickOutside = (e) => {
    if (!e.target.parentNode.contains(categoriesRef.current)) {
      setIsOpen(false);
    }
  };

  const onHandleChange = () => {
    if (window.location.pathname !== "/") {
      setIsOpen(!isOpen);
    }
  };

  return (
    <header>
      <Navigation />
      <div className="header__second-row">
        <h1 className="logo">
          <Link to="/">MOTO2</Link>
        </h1>
        <Search />
        <span className="header__phones">
          <p>+38 (050) 00 00 003</p>
          <p>+38 (067) 00 00 003</p>
        </span>
      </div>
      <div className="header__third-row">
        <span
          className="header__categories__wrapper"
          ref={categoriesRef}
        >
          <label
            className="header__categories"
            htmlFor="categories__btn__checkbox"
          >
            <FontAwesomeIcon
              icon={faBars}
              className="header__categories__btn"
            />
            <h2>
              <span>Каталог товарів</span>
            </h2>
          </label>
          <input
            id="categories__btn__checkbox"
            type="checkbox"
            name="categories__btn__checkbox"
            onChange={onHandleChange}
            checked={isOpen}
          />
          <span
            className="header__categories__list"
            onClick={() => setIsOpen(false)}
          >
            <CategoriesMenu />
          </span>
        </span>
        <Link
          to="/cart"
          className="profile__btn-desktop"
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className="profile__btn-title">Кошик 0.00 ₴</span>
        </Link>
        <LoginModal classes={"profile__btn-desktop"} />
        {activeUser.info.roles.includes("ADMIN") && (
          <Link
            to="/add/new-product"
            className="profile__btn-desktop"
          >
            <FontAwesomeIcon icon={faPlusSquare} />
            <span className="profile__btn-title">Додати товар</span>
          </Link>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  activeUser: PropTypes.object,
};
