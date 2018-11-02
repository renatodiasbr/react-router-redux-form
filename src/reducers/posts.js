import _ from "lodash";
import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_POST,
  REQUEST_POSTS_ERROR
} from "../actions";

const postsInitialState = {
  data: {},
  isFetching: false,
  error: ""
};

const posts = (state = postsInitialState, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        error: ""
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        data: _.mapKeys(action.data, "id"),
        isFetching: false,
        error: ""
      };
    case REQUEST_POST:
      let data = state.data;
      data[action.data.id] = action.data;
      return {
        ...state,
        data: data,
        isFetching: false,
        error: ""
      };
    case REQUEST_POSTS_ERROR:
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
