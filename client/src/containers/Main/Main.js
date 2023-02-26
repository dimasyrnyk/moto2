import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./Main.scss";
import MainNav from "./MainNav";
import HomePage from "../../pages/HomePage";
import Partners from "../../pages/Partners";
import Delivery from "../../pages/Delivery";
import Returns from "../../pages/Returns";
import AboutUs from "../../pages/AboutUs";
import Contacts from "../../pages/Contacts";
import Search from "../../pages/SearchPage";
import UserProfile from "../../components/User/UserProfile";
import ProductPage from "../../components/Product/ProductPage";
import ProductAdd from "../../components/Product/ProductAdd";
import ProductEdit from "../../components/Product/ProductEdit";
import Cart from "../../components/Cart/Cart";
import CategoryPage from "../../components/Categories/CategoryPage";

function Main() {
  return (
    <main className="container">
      <Switch>
        <Route path="*">
          <MainNav />
        </Route>
      </Switch>
      <Switch>
        <Route
          exact
          path="/"
          component={HomePage}
        />
        <Route
          path="/partners"
          component={Partners}
        />
        <Route
          path="/delivery"
          component={Delivery}
        />
        <Route
          path="/returns"
          component={Returns}
        />
        <Route
          path="/aboutus"
          component={AboutUs}
        />
        <Route
          path="/contacts"
          component={Contacts}
        />
        <Route
          path="/search"
          component={Search}
        />
        <Route
          path="/cart"
          component={Cart}
        />
        <Route
          path="/profile/:id"
          component={UserProfile}
        />
        <Route
          path="/add/new-product"
          component={ProductAdd}
        />
        <Route
          path="/product/:productId/edit"
          component={ProductEdit}
        />
        <Route
          path="/product/:id"
          component={ProductPage}
        />
        <Route
          exact
          path="/:link"
          component={CategoryPage}
        />
        <Redirect to="/" />
      </Switch>
    </main>
  );
}

export default Main;
