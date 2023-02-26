export const SHOW_LOADER = "SHOW_LOADER";
export const HIDE_LOADER = "HIDE_LOADER";
export const SHOW_ALERT = "SHOW_ALERT";
export const HIDE_ALERT = "HIDE_ALERT";
export const ADD_NAV_LINK = "ADD_NAV_LINK";
export const REMOVE_NAV_LINK = "REMOVE_NAV_LINK";

export const showLoader = () => ({
  type: SHOW_LOADER,
});

export const hideLoader = () => ({
  type: HIDE_LOADER,
});

export const showAlert = (text) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_ALERT,
      payload: text,
    });

    setTimeout(() => {
      dispatch(hideAlert());
    }, 3000);
  };
};

export const hideAlert = () => ({
  type: HIDE_ALERT,
});

export const addNavLink = (link) => ({
  type: ADD_NAV_LINK,
  payload: link,
});

export const removeNavLink = () => ({
  type: REMOVE_NAV_LINK,
});
