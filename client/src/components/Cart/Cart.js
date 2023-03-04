import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./Cart.scss";
import { PRODUCTS_CART_LOAD } from "../../store/products/actions";
import { productsCartLoad } from "../../store/products/actions";
import { removeProductFromActiveUserCart } from "../../store/activeuser/actions";
import { removeProductFromCart } from "../../store/cart/actions";

function Cart() {
  const { isAuth, token, cart, products, total, activeUser } = useSelector(
    (state) => ({
      isAuth: state.activeUser.auth,
      token: state.activeUser.token,
      cart: state.cart,
      products: state.products.cartProducts,
      total: state.products.cartProductsTotal,
      activeUser: state.activeUser,
    })
  );
  const cartProducts = isAuth ? activeUser.cart.products : cart.products;
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      if (cartProducts.length > 0) {
        await dispatch(productsCartLoad(cartProducts));
      } else {
        dispatch({ type: PRODUCTS_CART_LOAD, payload: [] });
      }
    };

    loadData();
  }, [cartProducts]);

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

  const formatPriceToUAH = (price) => {
    return price.toLocaleString("uk-UA", {
      style: "currency",
      currency: "UAH",
    });
  };

  return (
    <>
      <h1>Кошик</h1>
      <div className="cart__body">
        {products.map((product) => {
          return (
            <div
              className="cart__item"
              key={product._id}
            >
              <img
                className="item__img"
                src={product.src}
                alt="Product item"
              />
              <div className="item__info">
                <p>{product.title}</p>
                <p>Залишилось: {product.countInStock} шт.</p>
                <p>Ціна: {formatPriceToUAH(product.price)}</p>
              </div>
              <FontAwesomeIcon
                className="item__remove-btn"
                onClick={() => handleRemove(product._id)}
                icon={faTrash}
              />
            </div>
          );
        })}
        <div className="cart__total-price">
          Загальна сума: {formatPriceToUAH(total)}
        </div>
      </div>
    </>
  );
}

export default Cart;
