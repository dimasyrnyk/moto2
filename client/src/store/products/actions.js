import { showLoader, hideLoader, showAlert } from "../app/actions";

export const PRODUCT_SEARCH = "PRODUCT_SEARCH";
export const PRODUCTS_SEARCH_LOAD = "PRODUCTS_SEARCH_LOAD";
export const PRODUCT_CLEAR_SEARCH_VALUE = "PRODUCT_CLEAR_SEARCH_VALUE";
export const PRODUCT_LOAD = "PRODUCT_LOAD";
export const PRODUCTS_LOAD = "PRODUCTS_LOAD";
export const PRODUCTS_LOAD_HOME_PAGE = "PRODUCTS_LOAD_HOME_PAGE";
export const PRODUCT_CREATE = "PRODUCT_CREATE";
export const PRODUCT_EDIT = "PRODUCT_EDIT";
export const PRODUCT_REMOVE = "PRODUCT_REMOVE";

export const productSearch = (value) => ({
  type: PRODUCT_SEARCH,
  payload: value,
});

export const clearSearchValues = () => ({
  type: PRODUCT_CLEAR_SEARCH_VALUE,
});

export function productsSearchLoad(value) {
  return async (dispatch) => {
    dispatch(showLoader());
    const response = await fetch(`/api/product/search/s?q=${value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      dispatch(hideLoader());
      dispatch(
        showAlert({ text: "Товари не завантажено", color: "alert_red" })
      );
    } else {
      dispatch({ type: PRODUCTS_SEARCH_LOAD, payload: json });
      dispatch(hideLoader());
    }
  };
}

export function oneProductLoad(id) {
  return async (dispatch) => {
    dispatch(showLoader());
    const response = await fetch(`/api/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      dispatch(hideLoader());
      dispatch(showAlert({ text: "Товар не знайдено", color: "alert_red" }));
    } else {
      await dispatch({ type: PRODUCT_LOAD, payload: json });
      dispatch(hideLoader());
    }
  };
}

export function productsLoad(link) {
  return async (dispatch) => {
    dispatch(showLoader());
    const response = await fetch(`/api/product/category/${link}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      dispatch(hideLoader());
      dispatch(
        showAlert({ text: "Товари не завантажено", color: "alert_red" })
      );
    } else {
      dispatch({ type: PRODUCTS_LOAD, payload: json });
      dispatch(hideLoader());
    }
  };
}

export function productsLoadHomePage() {
  return async (dispatch) => {
    const response = await fetch("/api/product/homepage", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || "Something went wrong");
    } else {
      dispatch({ type: PRODUCTS_LOAD_HOME_PAGE, payload: json });
    }
  };
}

export function productCreate(data) {
  return async (dispatch) => {
    const response = await fetch("/api/product/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify(data.product),
    });

    const json = await response.json();

    if (!response.ok) {
      dispatch(
        showAlert({
          text: json.message || "Something went wrong",
          color: "alert_red",
        })
      );
    } else {
      dispatch({ type: PRODUCT_CREATE, payload: json.product });
      dispatch(showAlert({ text: json.message, color: "alert_green" }));
    }
  };
}

export function productEdit(data) {
  return async (dispatch) => {
    const response = await fetch(`/api/product/edit/${data.product._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify(data.product),
    });

    const json = await response.json();

    if (!response.ok) {
      dispatch(
        showAlert({
          text: json.message || "Something went wrong",
          color: "alert_red",
        })
      );
    } else {
      dispatch({ type: PRODUCT_EDIT, payload: data.product });
      dispatch(showAlert({ text: json.message, color: "alert_green" }));
    }
  };
}

export function productRemove(data) {
  return async (dispatch) => {
    const response = await fetch(`/api/product/delete/${data._id}`, {
      method: "DELETE",
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
      dispatch({ type: PRODUCT_REMOVE, payload: data._id });
      dispatch(showAlert({ text: json.message, color: "alert_green" }));
      dispatch(productsLoadHomePage());
    }
  };
}
