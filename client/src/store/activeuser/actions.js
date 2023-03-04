import { showLoader, hideLoader, showAlert } from "../app/actions";

export const USER_SIGNIN = "USER_SIGNIN";
export const USER_SIGNUP = "USER_SIGNUP";
export const USER_SIGNOUT = "USER_SIGNOUT";
export const USER_LOAD_DATA = "USER_LOAD_DATA";
export const USER_ADD_PRODUCT_TO_CART = "USER_ADD_PRODUCT_TO_CART";
export const USER_REMOVE_PRODUCT_FROM_CART = "USER_REMOVE_PRODUCT_FROM_CART";

export const userSignOut = (data) => {
  return async (dispatch) => {
    const response = await fetch(`/api/user/update-cart/${data.userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      dispatch(
        showAlert({
          text: json.message || "Щось пішло не так",
          color: "alert_red",
        })
      );
    } else {
      dispatch(showAlert({ text: json.message, color: "alert_green" }));
    }

    dispatch({ type: USER_SIGNOUT });
    localStorage.removeItem("activeUser");
  };
};

export function userSignUp(data) {
  return async (dispatch) => {
    dispatch(showLoader());
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      dispatch(hideLoader());
      dispatch(
        showAlert({
          text: json.message || "Щось пішло не так",
          color: "alert_red",
        })
      );
    } else {
      dispatch(hideLoader());
      dispatch(showAlert({ text: json.message, color: "alert_green" }));
    }
  };
}

export function userSignIn(data) {
  return async (dispatch) => {
    dispatch(showLoader());
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      dispatch(hideLoader());
      dispatch(
        showAlert({
          text: json.message || "Щось пішло не так",
          color: "alert_red",
        })
      );
    } else {
      dispatch({
        type: USER_SIGNIN,
        payload: { user: json.user, token: json.token },
      });
      dispatch(hideLoader());
      dispatch(showAlert({ text: json.message, color: "alert_green" }));

      localStorage.setItem(
        "activeUser",
        JSON.stringify({
          user: json.user,
          token: json.token,
        })
      );
    }
  };
}

export function userActiveLoadData(data) {
  return async (dispatch) => {
    dispatch(showLoader());
    const response = await fetch(`/api/auth/${data.userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      dispatch(hideLoader());
      dispatch(
        showAlert({
          text: json.message || "Щось пішло не так",
          color: "alert_red",
        })
      );
    } else {
      dispatch({ type: USER_LOAD_DATA, payload: json });
      dispatch(hideLoader());
    }
  };
}

export function updateActiveUserCart(data) {
  return async (dispatch) => {
    const response = await fetch(`/api/user/cart/update/${data.userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      dispatch(
        showAlert({
          text: json.message || "Щось пішло не так",
          color: "alert_red",
        })
      );
    } else {
      dispatch({ type: USER_LOAD_DATA, payload: json });
    }
  };
}

export function addProductToActiveUserCart(data) {
  return (dispatch) => {
    dispatch({
      type: USER_ADD_PRODUCT_TO_CART,
      payload: data,
    });
  };
}

export function removeProductFromActiveUserCart(data) {
  return (dispatch) => {
    dispatch({
      type: USER_REMOVE_PRODUCT_FROM_CART,
      payload: data,
    });
  };
}
