import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./Cart.scss";
import { useFormatUAH } from "../../hooks/format.hook";
import { PRODUCTS_CART_LOAD } from "../../store/products/actions";
import { productsCartLoad } from "../../store/products/actions";
import { removeProductFromActiveUserCart } from "../../store/activeuser/actions";
import { removeProductFromCart } from "../../store/cart/actions";
import CartItem from "./CartItem";

function Cart() {
  const { isAuth, cart, products, total, activeUser } = useSelector(
    (state) => ({
      isAuth: state.activeUser.auth,
      cart: state.cart,
      products: state.products.cartProducts,
      total: state.products.cartProductsTotal,
      activeUser: state.activeUser,
    })
  );
  const cartProducts = isAuth ? activeUser.cart.products : cart.products;
  const formattedTotalPrice = useFormatUAH(total);
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

  return (
    <>
      <h1>Кошик</h1>
      <div className="cart__body">
        {products.map((product) => (
          <CartItem
            product={product}
            key={product._id}
          />
        ))}
        <div className="cart__total-price">
          Загальна сума: {formattedTotalPrice}
        </div>
      </div>
    </>
  );
}

export default Cart;
