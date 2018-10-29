import _ from "lodash";
import {
  FETCHING_POSTS,
  FETCH_POSTS,
  FETCH_POST,
  FETCH_POSTS_ERROR
} from "../actions";

const postsInitialState = {
  data: {},
  isFetching: false,
  error: ""
};

const posts = (state = postsInitialState, action) => {
  switch (action.type) {
    case FETCHING_POSTS:
      return {
        ...state,
        isFetching: true,
        error: ""
      };
    case FETCH_POSTS:
      return {
        ...state,
        data: _.mapKeys(action.data, "id"),
        isFetching: false,
        error: ""
      };
    case FETCH_POST:
      let data = state.data;
      data[action.data.id] = action.data;
      return {
        ...state,
        data: data,
        isFetching: false,
        error: ""
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default posts;
