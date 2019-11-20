import axios from "axios";
import { setAlert, removeAlert } from "./alertActions";
import {
  GET_PROFILE,
  GET_PROFILES,
  GET_USER_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE
} from "./types";

//Get profiles
export const getProfiles = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

//Get profile
export const getProfile = id => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/${id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

//Clear profile
export const clearProfile = () => dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  });
};

//Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_USER_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

// Create or update profile
export const createProfile = (formData, update) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_USER_PROFILE,
      payload: res.data
    });

    dispatch(removeAlert());

    if (update) {
      dispatch(setAlert("Profile updated!", "primary"));
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch(removeAlert());
      errors.forEach(error => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
