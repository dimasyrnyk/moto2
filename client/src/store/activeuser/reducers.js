import {
  USER_SIGNIN,
  USER_LOAD_DATA,
  USER_SIGNOUT,
  USER_ADD_PRODUCT_TO_CART,
  USER_REMOVE_PRODUCT_FROM_CART,
} from "./actions";

const initialState = {
  auth: false,
  token: null,
  userId: null,
  cart: {
    products: [],
    total: 0,
  },
  info: {
    roles: [],
  },
};

export default function activeUserReducer(state = initialState, action) {
  switch (action.type) {
    case USER_SIGNIN:
      return {
        ...state,
        auth: true,
        token: action.payload.token,
        userId: action.payload.user._id,
        cart: action.payload.user.cart,
        info: action.payload.user,
      };
    case USER_LOAD_DATA:
      return { ...state, info: action.payload };
    case USER_SIGNOUT:
      return { ...initialState };
    case USER_ADD_PRODUCT_TO_CART:
      return { ...state, cart: action.payload };
    case USER_REMOVE_PRODUCT_FROM_CART:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
}
