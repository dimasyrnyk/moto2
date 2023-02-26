import { combineReducers } from "redux";
import activeUserReducer from "./activeuser/reducers";
import usersReducer from "./users/reducers";
import productsReducer from "./products/reducers";
import categoriesReducer from "./categories/reducers";
import appReducer from "./app/reducers";

const rootReducer = combineReducers({
  activeUser: activeUserReducer,
  app: appReducer,
  users: usersReducer,
  products: productsReducer,
  categories: categoriesReducer,
});

export default rootReducer;