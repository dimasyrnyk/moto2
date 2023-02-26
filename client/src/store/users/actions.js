import { showLoader, hideLoader, showAlert } from "../app/actions";

export const USER_LOAD_DATA = "USER_LOAD_DATA";
export const USER_CONFIRM = "USER_CONFIRM";
export const USER_CONFIRM_EMAIL = "USER_CONFIRM_EMAIL";
export const USER_RESET_PASSWORD = "USER_RESET_PASSWORD";

export function userLoadData(data) {
  return async (dispatch) => {
    dispatch(showLoader());
    const response = await fetch(`/api/user/${data._id}`, {
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
    dispatch(hideLoader());
  };
}

export function userConfirm(data) {
  return async (dispatch) => {
    dispatch(showLoader());
    const response = await fetch("/api/reset/userconfirm", {
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
      dispatch({ type: USER_CONFIRM, payload: json });
    }
  };
}

export function userConfirmEmail(data) {
  return async (dispatch) => {
    dispatch(showLoader());
    const response = await fetch("/api/reset/emailconfirm", {
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
      dispatch({ type: USER_CONFIRM_EMAIL, payload: json });
    }
  };
}

export function userResetPassword(data) {
  return async (dispatch) => {
    dispatch(showLoader());
    const response = await fetch("/api/reset/resetpass", {
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
      dispatch({ type: USER_RESET_PASSWORD, payload: json.status });
    }
  };
}
