import axios from "axios";
import { toastr } from "react-redux-toastr";

export const FETCHING_POSTS = "FETCHING_POSTS";
export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_POST = "FETCH_POST";
export const CREATE_POSTS = "CREATE_POSTS";
export const FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR";

//const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const ROOT_URL = "http://localhost:8080/api";
const API_KEY = "?key=258753159";

export function fetchPosts() {
  return dispatch => {
    dispatch({
      type: FETCHING_POSTS
    });
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then(
      response =>
        dispatch({
          type: FETCH_POSTS,
          data: response.data
        }),
      error => {
        dispatch({
          type: FETCH_POSTS_ERROR,
          error: error.message
        });
        toastr.error("Error", error.message);
      }
    );
  };
}

export function fetchPost(id) {
  return dispatch => {
    dispatch({
      type: FETCHING_POSTS
    });
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then(
      response =>
        dispatch({
          type: FETCH_POST,
          data: response.data
        }),
      error =>
        dispatch({
          type: FETCH_POSTS_ERROR,
          error: error.message
        })
    );
  };
}

export function createPost(post, callback) {
  const request = axios
    .post(`${ROOT_URL}/posts${API_KEY}`, post)
    .then(() => callback());

  return {
    type: CREATE_POSTS,
    payload: request
  };
}
