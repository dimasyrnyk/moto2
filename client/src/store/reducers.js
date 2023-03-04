import { combineReducers } from "redux";
import activeUserReducer from "./activeuser/reducers";
import usersReducer from "./users/reducers";
import productsReducer from "./products/reducers";
import categoriesReducer from "./categories/reducers";
import cartReducer from "./cart/reducers";
import appReducer from "./app/reducers";

const rootReducer = combineReducers({
  activeUser: activeUserReducer,
  app: appReducer,
  cart: cartReducer,
  users: usersReducer,
  products: productsReducer,
  categories: categoriesReducer,
});

export default rootReducer;
