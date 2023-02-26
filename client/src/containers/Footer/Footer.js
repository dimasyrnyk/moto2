import React from "react";
import { Link } from "react-router-dom";

import "./Footer.scss";

export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer__menu">
          <h4 className="footer__title">МЕНЮ</h4>
          <ul className="footer__menu__list">
            <li>
              <Link to="/">Магазин</Link>
            </li>
            <li>
              <Link to="/partners">Партнерам</Link>
            </li>
            <li>
              <Link to="/delivery">Оплата і доставка</Link>
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
          </ul>
        </div>
        <div className="footer__categories">
          <h4 className="footer__title">КАТАЛОГ ТОВАРІВ</h4>
          <ul className="footer__menu__list">
            <li>
              <Link to="/new-parts">Нові запчастини</Link>
            </li>
            <li>
              <Link to="/used-parts">Розборка</Link>
            </li>
            <li>
              <Link to="/electric-scooters">Електроскутери</Link>
            </li>
            <li>
              <Link to="/electric-kick-scooters">Електросамокати</Link>
            </li>
          </ul>
        </div>
        <div className="footer__contacts">
          <h4 className="footer__title">КОНТАКТИ</h4>
          <p>м. Тернопіль</p>
          <p>ринок "Котломонтаж", відділ 134</p>
          <p>email: shop@moto2.com.ua</p>
          <p>тел.: +380 (050) 00 00 003</p>
          <p>тел.: +380 (067) 00 00 003</p>
        </div>
      </div>
      <h5 className="footer__end">Copyright @ moto2.com.ua 2023</h5>
    </footer>
  );
}
