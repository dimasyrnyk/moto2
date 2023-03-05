import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./Cart.scss";
import { useFormatUAH } from "../../hooks/format.hook";
import { removeProductFromActiveUserCart } from "../../store/activeuser/actions";
import { removeProductFromCart } from "../../store/cart/actions";

function CartItem({ product }) {
  const { isAuth, token, products } = useSelector((state) => ({
    isAuth: state.activeUser.auth,
    token: state.activeUser.token,
    products: state.products.cartProducts,
  }));
  const formattedPrice = useFormatUAH(product.price);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    const newCartProducts = [...products].filter((i) => i._id !== id);
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
      dispatch(removeProductFromActiveUserCart(newCart));
    } else {
      localStorage.setItem("cart", JSON.stringify(newCart));
      dispatch(removeProductFromCart(newCart));
    }
  };

  return (
    <div className="cart__item">
      <img
        className="item__img"
        src={product.src}
        alt="Product item"
      />
      <div className="item__info">
        <p>{product.title}</p>
        <p>Залишилось: {product.countInStock} шт.</p>
        <p>Ціна: {formattedPrice}</p>
      </div>
      <FontAwesomeIcon
        className="item__remove-btn"
        onClick={() => handleRemove(product._id)}
        icon={faTrash}
      />
    </div>
  );
}

export default CartItem;
