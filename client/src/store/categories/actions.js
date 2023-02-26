import { showLoader, hideLoader, showAlert } from "../app/actions";

export const CATEGORIES_LOAD = "CATEGORIES_LOAD";

export function categoriesLoad() {
  return async (dispatch) => {
    dispatch(showLoader());
    const response = await fetch("/api/category/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      dispatch(hideLoader());
      dispatch(
        showAlert({ text: "Категорії не завантажено", color: "alert_red" })
      );
    } else {
      dispatch({ type: CATEGORIES_LOAD, payload: json });
      dispatch(hideLoader());
    }
  };
}
