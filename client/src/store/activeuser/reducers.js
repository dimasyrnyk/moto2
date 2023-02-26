import { USER_SIGNIN, USER_LOAD_DATA, USER_SIGNOUT } from "./actions";

const initialState = {
  auth: false,
  token: null,
  userId: null,
  info: {
    roles: []
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
        info: action.payload.user,
      };
    case USER_LOAD_DATA:
      return { ...state, info: action.payload };
    case USER_SIGNOUT:
      return { ...initialState };
    default:
      return state;
  }
}