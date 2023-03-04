import { CART_INIT, CART_ADD_PRODUCT, CART_REMOVE_PRODUCT } from "./actions";

const initialState = {
  products: [],
  total: 0,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_INIT:
      return { ...state, ...action.payload };
    case CART_ADD_PRODUCT:
      return { ...state, ...action.payload };
    case CART_REMOVE_PRODUCT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
