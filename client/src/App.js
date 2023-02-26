import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { USER_SIGNIN } from "./store/activeuser/actions";
import { categoriesLoad } from "./store/categories/actions";
import Header from "./containers/Header/Header";
import Footer from "./containers/Footer/Footer";
import Main from "./containers/Main/Main";
import Alert from "./components/Alert/Alert";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      const data = JSON.parse(localStorage.getItem("activeUser"));
      // // localStorage.removeItem('activeUser')

      if (data && data.token) {
        dispatch({
          type: USER_SIGNIN,
          payload: { token: data.token, user: data.user },
        });
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
