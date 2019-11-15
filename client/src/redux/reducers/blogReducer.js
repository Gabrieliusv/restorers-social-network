import {
  BLOG_IMG,
  CLEAR_BLOG,
  BLOG_ERROR,
  DELETE_BLOG_IMG,
  BLOG_SUCCESS
} from '../actions/types';

const initialState = {
  blogImages: [],
  loading: true,
  error: [],
  blogSaved: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BLOG_IMG:
      return {
        ...state,
        blogImages: [...state.blogImages, payload]
      };
    case DELETE_BLOG_IMG:
      let newBlogImages = [...state.blogImages];
      newBlogImages.splice(payload, 1);
      return {
        ...state,
        blogImages: [...newBlogImages]
      };
    case BLOG_SUCCESS:
      return {
        ...state,
        blogSaved: true
      };
    case CLEAR_BLOG:
      return {
        blogImages: [],
        loading: true,
        error: [],
        blogSaved: false
      };
    case BLOG_ERROR:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
}
