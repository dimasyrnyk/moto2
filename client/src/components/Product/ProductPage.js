import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import "./Product.scss";
import { oneProductLoad, productRemove } from "../../store/products/actions";
import ProductAddToCartBtn from "./ProductAddToCartBtn";
import { AppLoader } from "../AppLoader/AppLoader";
import Alert from "../Alert/Alert";

export default function ProductPage() {
  const { activeUser, product, app } = useSelector((state) => ({
    activeUser: state.activeUser,
    product: state.products.oneProduct,
    app: state.app,
  }));
  const isAdmin = activeUser.info.roles.includes("ADMIN");
  const productId = useParams().id;
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (product._id !== productId) {
      dispatch(oneProductLoad(productId));
    }
  }, [dispatch, product._id, productId]);

  const Status = Object.freeze({
    1: { title: "В наявності", styles: "isnow_green" },
    2: { title: "Немає", styles: "isnow_red" },
    3: { title: "Очікується", styles: "isnow_orange" },
  });

  const onHandleRemove = () => {
    dispatch(productRemove({ _id: product._id, token: activeUser.token }));
    history.goBack();
  };

  if (app.loading) return <AppLoader />;

  return (
    <>
      {app.alertMessage && <Alert />}
      {product.hasOwnProperty("_id") ? (
        <div>
          <h2 className="product__title">{product.title}</h2>
          {isAdmin && (
            <div className="admin__controls">
              <input
                type="button"
                className="product__remove-btn"
                onClick={onHandleRemove}
                value="Видалити"
              />
              <Link to={"/product/" + product._id + "/edit"}>
                <input
                  type="button"
                  className="product__edit-btn"
                  value="Редагувати"
                />
              </Link>
            </div>
          )}
          <span>Код: {product.code}</span>
          <span className="product__grid">
            <img
              className="product__img"
              src={product.src}
              alt="Product item"
            />
            <span className="product__price-section">
              <h4>Ціна</h4>
              <p className="product__price">{product.price} ₴</p>
              <p className={Status[product.status].styles}>
                {Status[product.status].title}
              </p>
              <ProductAddToCartBtn product={product} />
            </span>
            <span className="product__short-desc">
              <h5>Опис</h5>
              <p>{product.shortDesc}</p>
            </span>
          </span>
          <span className="product__full-desc">
            <h5>Усі характеристики товару</h5>
            <p>{product.fullDesc}</p>
          </span>
        </div>
      ) : (
        <p>Товар не знайдено...</p>
      )}
    </>
  );
}

ProductPage.propTypes = {
  activeUser: PropTypes.object,
  product: PropTypes.object,
  app: PropTypes.object,
  oneProductLoad: PropTypes.func,
  productRemove: PropTypes.func,
};
