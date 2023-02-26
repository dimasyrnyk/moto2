import { showLoader, hideLoader, showAlert } from "../app/actions";

export const USER_SIGNIN = "USER_SIGNIN";
export const USER_SIGNUP = "USER_SIGNUP";
export const USER_SIGNOUT = "USER_SIGNOUT";
export const USER_LOAD_DATA = "USER_LOAD_DATA";

export const userSignOut = () => ({
  type: USER_SIGNOUT,
});

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
