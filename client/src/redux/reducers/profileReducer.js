import {
  PROFILE_ERROR,
  GET_PROFILE,
  GET_USER_PROFILE,
  GET_PROFILES,
  CLEAR_PROFILE
} from "../actions/types";

const initialState = {
  profile: {},
  profileLoading: true,
  profiles: [],
  profilesLoading: true,
  userProfile: null,
  loading: true,
  error: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        profileLoading: false
      };
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        profilesLoading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        userProfile: null,
        loading: true,
        error: []
      };
    default:
      return state;
  }
}
