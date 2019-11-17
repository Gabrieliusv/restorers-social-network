import { combineReducers } from 'redux';

import authReducer from './authReducer';
import alertReducer from './alertReducer';
import profileReducer from './profileReducer';
import blogReducer from './blogReducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  profile: profileReducer,
  blog: blogReducer
});
