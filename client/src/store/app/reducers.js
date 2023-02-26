import {
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ALERT,
  HIDE_ALERT,
  ADD_NAV_LINK,
  REMOVE_NAV_LINK,
} from "./actions";

const initialState = {
  appLoading: false,
  loading: false,
  alert: null,
  navLinks: [],
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    case SHOW_ALERT:
      return {
        ...state,
        alert: { text: action.payload.text, color: action.payload.color },
      };
    case HIDE_ALERT:
      return { ...state, alert: null };
    case ADD_NAV_LINK:
      return { ...state, navLinks: [action.payload, ...state.navLinks] };
    case REMOVE_NAV_LINK:
      return { ...state, navLinks: [] };
    default:
      return state;
  }
}
