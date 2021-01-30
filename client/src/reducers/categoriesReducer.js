import {
  FETCH_CATEGIES_REQUEST,
  FETCH_CATEGIES_SUCCESS,
  FETCH_CATEGIES_FAIL,
} from '../constants/categoriesConstants';

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CATEGIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case FETCH_CATEGIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
