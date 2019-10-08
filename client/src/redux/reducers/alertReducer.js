import {
  SET_ALERT,
  REMOVE_ALERT,
  SET_LOGIN_ALERT,
  REGISTER_SUCCESS
} from '../actions/types';

const initialState = {
  alerts: [],
  loginAlert: [],
  registerAlert: ''
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, payload]
      };
    case SET_LOGIN_ALERT:
      return {
        ...state,
        loginAlert: [...state.alerts, payload]
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerAlert: payload
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: [],
        loginAlert: [],
        registerAlert: ''
      };
    default:
      return state;
  }
}
