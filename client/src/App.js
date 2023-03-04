import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { USER_SIGNIN } from "./store/activeuser/actions";
import { CART_INIT } from "./store/cart/actions";
import { categoriesLoad } from "./store/categories/actions";
import Header from "./containers/Header/Header";
import Footer from "./containers/Footer/Footer";
import Main from "./containers/Main/Main";
import Alert from "./components/Alert/Alert";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      const activeUser = JSON.parse(localStorage.getItem("activeUser"));
      const cart = JSON.parse(localStorage.getItem("cart"));
      // localStorage.removeItem('activeUser')
      // localStorage.removeItem("cart");

      if (activeUser && activeUser.token) {
        dispatch({
          type: USER_SIGNIN,
          payload: { token: activeUser.token, user: activeUser.user },
        });
      } else if (cart) {
        dispatch({ type: CART_INIT, payload: cart });
      }
      await dispatch(categoriesLoad());
    };

    loadData();
  }, [dispatch]);

  return (
    <div className="app">
      <Alert />
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
