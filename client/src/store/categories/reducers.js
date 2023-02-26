import { CATEGORIES_LOAD } from "./actions";

const initialState = {
  categories: [],
};

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORIES_LOAD:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
}
