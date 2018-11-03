import _ from "lodash";
import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_POST,
  REQUEST_CREATE_POST,
  RECEIVE_CREATE_POST,
  REQUEST_CREATE_POST_ERROR,
  REQUEST_DELETE_POST,
  RECEIVE_DELETE_POST,
  REQUEST_DELETE_POST_ERROR,
  REQUEST_POSTS_ERROR,
  RECEIVE_POST
} from "../actions";

const postsInitialState = {
  data: {},
  isFetching: false,
  error: ""
};

const posts = (state = postsInitialState, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
    case REQUEST_POST:
    case REQUEST_CREATE_POST:
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
    case RECEIVE_POST:
    case RECEIVE_CREATE_POST:
      let data = state.data;
      data[action.data.id] = action.data;
      return {
        ...state,
        data: data,
        isFetching: false,
        error: ""
      };
    case REQUEST_DELETE_POST:
      data = state.data;
      data[action.id].isDeleting = true;
      return {
        ...state,
        data,
        error: ""
      };
    case REQUEST_DELETE_POST_ERROR:
      data = state.data;
      data[action.id].isDeleting = false;
      return {
        ...state,
        data,
        error: action.error
      };
    case RECEIVE_DELETE_POST:
      return {
        ...state,
        data: _.omit(state.data, action.id),
        error: ""
      };
    case REQUEST_POSTS_ERROR:
    case REQUEST_CREATE_POST_ERROR:
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
