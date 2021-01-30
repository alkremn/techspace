import axios from '../util/axios';
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
} from '../constants/authConstants';

export const loginAction = (email, password) => async dispatch => {
  try {
    dispatch({ type: AUTH_REQUEST });

    const config = {
      'Content-Type': 'application/json',
    };
    const { data } = await axios.post(
      '/api/v1/auth/login',
      {
        email,
        password,
      },
      config
    );
    dispatch({ type: AUTH_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logoutAction = () => {
  return {
    type: AUTH_LOGOUT,
  };
};
