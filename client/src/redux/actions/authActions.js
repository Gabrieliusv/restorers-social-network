import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  NO_TOKEN,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from './types';
import { setAlert, setLoginAlert, removeAlert } from './alertActions';
import setAuthToken from '../../utils/setAuthToken';

//Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    localStorage.removeItem('token');

    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Register User
export const register = ({
  name,
  email,
  password,
  aboutMe
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password, aboutMe });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      dispatch(removeAlert());
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    localStorage.setItem('token', res.data.token);
    setAuthToken(localStorage.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(removeAlert());
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      dispatch(removeAlert());
      errors.forEach(error => dispatch(setLoginAlert(error.msg)));
    }

    localStorage.removeItem('token');

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//LogOut / Clear Profile
export const logout = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({
    type: CLEAR_PROFILE
  });
  dispatch({
    type: LOGOUT
  });
};

//No token
export const noToken = () => dispatch => {
  dispatch({
    type: NO_TOKEN
  });
};
