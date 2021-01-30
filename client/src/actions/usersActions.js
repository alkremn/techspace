import axios from '../util/axios';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
} from '../constants/usersConstants';

export const fetchUsersAction = () => async (dispatch, getState) => {
  if (getState().auth.user) {
    try {
      dispatch({ type: FETCH_USERS_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      };
      const { data } = await axios.get('/api/v1/users', config);
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: FETCH_USERS_FAIL, payload: error });
    }
  }
};
