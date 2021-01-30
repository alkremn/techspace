import axios from '../util/axios';
import {
  FETCH_SOLUTIONS_REQUEST,
  FETCH_SOLUTIONS_SUCCESS,
  FETCH_SOLUTIONS_FAIL,
  CREATE_SOLUTION_REQUEST,
  CREATE_SOLUTION_SUCCESS,
  CREATE_SOLUTION_FAIL,
} from '../constants/solutionsConstants';

export const fetchSulotionsByCatIdAction = categoryId => async (
  dispatch,
  getState
) => {
  if (getState().auth.user) {
    try {
      dispatch({
        type: FETCH_SOLUTIONS_REQUEST,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/v1/solutions/query?categoryId=${categoryId}`,
        config
      );
      dispatch({
        type: FETCH_SOLUTIONS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_SOLUTIONS_FAIL,
        error: error,
      });
    }
  }
};

export const createSolutionAction = solution => async (dispatch, getState) => {
  if (getState().auth.user) {
    try {
      dispatch({
        type: CREATE_SOLUTION_REQUEST,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      };

      const res = await axios.post(
        '/api/v1/solutions',
        {
          solution: { ...solution, createdBy: getState().auth.user._id },
        },
        config
      );
      if (res.status === 201) {
        dispatch({
          type: CREATE_SOLUTION_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: CREATE_SOLUTION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
};
