import {
  FETCH_SOLUTIONS_REQUEST,
  FETCH_SOLUTIONS_SUCCESS,
  FETCH_SOLUTIONS_FAIL,
  CREATE_SOLUTION_REQUEST,
  CREATE_SOLUTION_SUCCESS,
  CREATE_SOLUTION_FAIL,
} from '../constants/solutionsConstants';

const initialState = {
  solutions: [],
  solutionLoading: false,
  error: null,
};

export const solutionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SOLUTIONS_REQUEST:
      return {
        ...state,
        solutionLoading: true,
      };
    case FETCH_SOLUTIONS_SUCCESS:
      return {
        ...state,
        solutionLoading: false,
        solutions: [...action.payload],
      };
    case FETCH_SOLUTIONS_FAIL:
      return {
        ...state,
        solutionLoading: false,
        error: action.payload,
      };
    case CREATE_SOLUTION_REQUEST:
      return {
        ...state,
        solutionLoading: true,
      };
    case CREATE_SOLUTION_SUCCESS:
      return {
        ...state,
        solutionLoading: false,
        solutions: [...state.solutions, action.payload],
      };
    case CREATE_SOLUTION_FAIL:
      return {
        ...state,
        solutionLoading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};
