import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import "./Product.scss";

export default function ProductAddForm({ product, setProduct }) {
  const categories = useSelector((state) => state.categories.categories);

  return (
    <form className="add-product__form">
      <span className="row">
        <span className="row__title">Назва: *</span>
        <input
          className="row__input"
          type="text"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          placeholder="Введіть назву"
        />
      </span>

      <span className="row">
        <span className="row__title">Посилання: *</span>
        <input
          className="row__input"
          type="url"
          value={product.src}
          onChange={(e) => setProduct({ ...product, src: e.target.value })}
          placeholder="Посилання на зображення"
        />
      </span>

      <span className="row">
        <span className="row__title">Категорія: *</span>
        <select
          className="row__select"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        >
          {categories.map((i) => (
            <option
              value={i.link}
              key={i._id}
            >
              {i.name}
            </option>
          ))}
        </select>
      </span>

      <span className="row">
        <span className="row__title">Виробник: *</span>
        <input
          className="row__input"
          type="url"
          value={product.producer}
          onChange={(e) => setProduct({ ...product, producer: e.target.value })}
          placeholder="Вкажіть країну виробника"
        />
      </span>
      <span className="row">
        <span className="row__title">Код товару: *</span>
        <input
          className="row__input"
          type="url"
          value={product.code}
          onChange={(e) => setProduct({ ...product, code: e.target.value })}
          placeholder="Вкажіть код товару"
        />
      </span>
      <span className="row">
        <span className="row__title">Кількість: *</span>
        <input
          className="row__input"
          type="number"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
          placeholder="Вкажіть кількість товару"
        />
      </span>
      <span className="row">
        <span className="row__title">Статус товару: *</span>
        <select
          className="row__select"
          value={product.status}
          onChange={(e) => setProduct({ ...product, status: e.target.value })}
        >
          {["В наявності", "Немає", "Очікується"].map((item, index) => (
            <option
              value={index + 1}
              key={index}
            >
              {item}
            </option>
          ))}
        </select>
      </span>
      <span className="row">
        <span className="row__title">Ціна: *</span>
        <input
          className="row__input"
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          placeholder="Вкажіть ціну"
        />
      </span>
      <span className="row">
        <span className="row__title">Гуртова ціна: *</span>
        <input
          className="row__input"
          type="number"
          value={product.businessPrice}
          onChange={(e) =>
            setProduct({ ...product, businessPrice: e.target.value })
          }
          placeholder="Вкажіть гуртову ціну"
        />
      </span>
      <span className="row">
        <span className="row__title">Короткий опис: *</span>
        <textarea
          className="row__textarea"
          type="text"
          value={product.shortDesc}
          onChange={(e) =>
            setProduct({ ...product, shortDesc: e.target.value })
          }
          placeholder="Додайте короткий опис"
        ></textarea>
      </span>
      <span className="row">
        <span className="row__title">Повний опис: *</span>
        <textarea
          className="row__textarea"
          type="text"
          value={product.fullDesc}
          onChange={(e) => setProduct({ ...product, fullDesc: e.target.value })}
          placeholder="Додайте повний опис"
        ></textarea>
      </span>
    </form>
  );
}

ProductAddForm.propTypes = {
  product: PropTypes.object,
  setProduct: PropTypes.func,
};
