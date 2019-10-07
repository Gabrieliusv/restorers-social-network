import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT, SET_LOGIN_ALERT } from './types';

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
};

export const removeAlert = () => {
  return {
    type: REMOVE_ALERT
  };
};

export const setLoginAlert = msg => {
  return {
    type: SET_LOGIN_ALERT,
    payload: msg
  };
};
