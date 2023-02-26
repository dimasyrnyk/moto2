import {
  USER_LOAD_DATA,
  USER_CONFIRM,
  USER_CONFIRM_EMAIL,
  USER_RESET_PASSWORD,
} from "./actions";

const initialState = {
  users: [],
  loadUser: {},
  resetPass: {
    confirmUser: false,
    confirmEmail: false,
    userId: "",
    status: false,
  },
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOAD_DATA:
      return { ...state, loadUser: action.payload };
    case USER_CONFIRM:
      return {
        ...state,
        resetPass: {
          confirmUser: action.payload.confirmUser,
          userId: action.payload.userId,
        },
      };
    case USER_CONFIRM_EMAIL:
      return {
        ...state,
        resetPass: {
          confirmUser: state.resetPass.confirmUser,
          confirmEmail: action.payload.confirmEmail,
          userId: action.payload.userId,
        },
      };
    case USER_RESET_PASSWORD:
      return { ...state, resetPass: { status: action.payload } };
    default:
      return state;
  }
}
