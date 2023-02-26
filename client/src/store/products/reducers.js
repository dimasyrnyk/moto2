import {
  PRODUCT_SEARCH,
  PRODUCTS_SEARCH_LOAD,
  PRODUCT_CLEAR_SEARCH_VALUE,
  PRODUCT_CREATE,
  PRODUCT_REMOVE,
  PRODUCT_EDIT,
  PRODUCT_LOAD,
  PRODUCTS_LOAD,
  PRODUCTS_LOAD_HOME_PAGE,
} from "./actions";

const initialState = {
  homePageProducts: [],
  loadProducts: [],
  searchProducts: [],
  searchValue: null,
  oneProduct: {},
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_SEARCH:
      return { ...state, searchValue: action.payload };
    case PRODUCTS_SEARCH_LOAD:
      return { ...state, searchProducts: action.payload };
    case PRODUCT_CLEAR_SEARCH_VALUE:
      return { ...state, searchValue: null };
    case PRODUCT_LOAD:
      return { ...state, oneProduct: action.payload };
    case PRODUCTS_LOAD:
      return { ...state, loadProducts: action.payload };
    case PRODUCTS_LOAD_HOME_PAGE:
      return { ...state, homePageProducts: action.payload };
    case PRODUCT_CREATE:
      return {
        ...state,
        homePageProducts: [action.payload, ...state.homePageProducts],
      };
    case PRODUCT_REMOVE:
      let filteredProducts = { ...state }.loadProducts.filter(
        (product) => product._id !== action.payload
      );
      return { ...state, loadProducts: filteredProducts };
    case PRODUCT_EDIT:
      return { ...state, oneProduct: action.payload };
    default:
      return state;
  }
}
