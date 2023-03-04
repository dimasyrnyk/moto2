export const CART_INIT = "CART_INIT";
export const CART_ADD_PRODUCT = "CART_ADD_PRODUCT";
export const CART_REMOVE_PRODUCT = "CART_REMOVE_PRODUCT";

export function addProductToCart(data) {
  return (dispatch) => {
    dispatch({
      type: CART_ADD_PRODUCT,
      payload: data,
    });
  };
}

export function removeProductFromCart(data) {
  return (dispatch) => {
    dispatch({
      type: CART_REMOVE_PRODUCT,
      payload: data,
    });
  };
}
