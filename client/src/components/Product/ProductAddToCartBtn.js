import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import "./ProductCard.scss";
import { addProductToActiveUserCart } from "../../store/activeuser/actions";
import { addProductToCart } from "../../store/cart/actions";

export default function ProductAddToCartBtn({ product }) {
  const { isAuth, token, cart, activeUser } = useSelector((state) => ({
    isAuth: state.activeUser.auth,
    token: state.activeUser.token,
    cart: state.cart,
    activeUser: state.activeUser,
  }));
  const cartProducts = isAuth ? activeUser.cart.products : cart.products;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const newCartProduct = {
      _id: product._id,
      title: product.title,
      src: product.src,
      price: product.price,
      countInStock: product.quantity,
      qty: 1,
    };
    const newCartProducts = [...cartProducts, newCartProduct];
    let newTotal = 0;
    newCartProducts.forEach((i) => (newTotal = newTotal + i.price * i.qty));
    const newCart = {
      products: newCartProducts,
      total: newTotal,
    };

    if (isAuth) {
      const data = JSON.parse(localStorage.getItem("activeUser"));
      localStorage.setItem(
        "activeUser",
        JSON.stringify({ user: { ...data.user, cart: newCart }, token })
      );
      dispatch(addProductToActiveUserCart(newCart));
    } else {
      localStorage.setItem("cart", JSON.stringify(newCart));
      dispatch(addProductToCart(newCart));
    }
  };

  return (
    <button
      className="card__btn"
      onClick={handleAddToCart}
    >
      Додати в кошик
    </button>
  );
}

ProductAddToCartBtn.propTypes = {
  isAuth: PropTypes.bool,
  cart: PropTypes.object,
  activeUser: PropTypes.object,
  token: PropTypes.string,
  product: PropTypes.object.isRequired,
  addProductToActiveUserCart: PropTypes.func,
  addProductToCart: PropTypes.func,
};
