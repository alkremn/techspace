import axios from '../util/axios';
import { LOADING_FINISH, LOADING_START } from '../constants/asyncConstants';
import {
  FETCH_CATEGIES_SUCCESS,
  FETCH_CATEGIES_FAIL,
} from '../constants/categoriesConstants';

export const fetchCategoriesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LOADING_START });

    const config = {
      headers: {
        Authorization: 'Bearer ' + getState().auth.user.token,
      },
    };

    const { data } = await axios.get('/api/v1/categories', config);

    dispatch({ type: FETCH_CATEGIES_SUCCESS, payload: data });
    dispatch({ type: LOADING_FINISH });
  } catch (error) {
    dispatch({
      type: FETCH_CATEGIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
