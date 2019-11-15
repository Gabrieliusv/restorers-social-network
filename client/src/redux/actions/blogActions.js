import axios from 'axios';
import { setAlert, removeAlert } from './alertActions';
import {
  BLOG_IMG,
  CLEAR_BLOG,
  BLOG_ERROR,
  DELETE_BLOG_IMG,
  BLOG_SUCCESS
} from './types';

//Upload blog image
export const uploadBlogImg = img => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    const res = await axios.post('/api/blog/image', img, config);

    dispatch({
      type: BLOG_IMG,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch(removeAlert());
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: BLOG_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

//Delete blog image
export const deleteBlogImg = (fileName, index) => async dispatch => {
  try {
    await axios.delete(`/api/blog/image/${fileName}`);

    dispatch({
      type: DELETE_BLOG_IMG,
      payload: index
    });
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

// Create Blog post
export const createPost = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const res = await axios.post('/api/blog', formData, config);

    dispatch({
      type: BLOG_SUCCESS,
      payload: res.data.msg
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch(removeAlert());
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: BLOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Clear blog
export const clearBlog = () => {
  return {
    type: CLEAR_BLOG
  };
};
