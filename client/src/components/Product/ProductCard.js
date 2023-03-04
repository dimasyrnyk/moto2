import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import "./ProductCard.scss";
import { productRemove } from "../../store/products/actions";
import ProductAddToCartBtn from "./ProductAddToCartBtn";

export default function ProductCard({ product }) {
  const { isAdmin, token } = useSelector((state) => ({
    isAdmin: state.activeUser.info.roles.includes("ADMIN"),
    token: state.activeUser.token,
  }));
  const editPath = "/product/" + product._id + "/edit";
  const dispatch = useDispatch();

  const Status = Object.freeze({
    1: { title: "В наявності", styles: "isnow_green" },
    2: { title: "Немає", styles: "isnow_red" },
    3: { title: "Очікується", styles: "isnow_orange" },
  });

  const handleRemove = () => {
    dispatch(productRemove({ _id: product._id, token }));
  };

  return (
    <li className="card">
      {isAdmin && (
        <>
          <FontAwesomeIcon
            className="card__remove-btn"
            onClick={handleRemove}
            icon={faTrash}
          />
          <Link to={editPath}>
            <FontAwesomeIcon
              className="card__edit-btn"
              icon={faEdit}
            />
          </Link>
        </>
      )}
      <Link to={"/product/" + product._id}>
        <img
          className="card__img"
          src={product.src}
          alt="Product item"
        />
        <h3 className="card__title">{product.title}</h3>
      </Link>
      <div className="card__spec">
        <span className="card__code">Код: {product.code}</span>
        <span className="card__price">{product.price} грн</span>
      </div>
      <span className={Status[product.status].styles}>
        {Status[product.status].title}
      </span>
      <ProductAddToCartBtn product={product} />
    </li>
  );
}

ProductCard.propTypes = {
  isAdmin: PropTypes.bool,
  token: PropTypes.string,
  product: PropTypes.object.isRequired,
  productRemove: PropTypes.func,
};
