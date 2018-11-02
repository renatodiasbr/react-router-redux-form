import axios from "axios";
import { toastr } from "react-redux-toastr";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const REQUEST_POST = "REQUEST_POST";
export const CREATE_POST = "CREATE_POST";
export const REQUEST_POSTS_ERROR = "REQUEST_POSTS_ERROR";

const ROOT_URL = "http://reduxblog.herokuapp.com/api";
//const ROOT_URL = "http://localhost:8080/api";

//Add defaults
axios.defaults.baseURL = ROOT_URL;
axios.defaults.params = { key: 258753159 };

// Add a request interceptor
axios.interceptors.request.use(null, function(error) {
  toastr.error("Error", error.message);
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(null, function(error) {
  toastr.error("Error", error.message);
  return Promise.reject(error);
});

export function fetchPosts() {
  return dispatch => {
    dispatch({
      type: REQUEST_POSTS
    });
    axios.get("posts").then(
      response =>
        dispatch({
          type: RECEIVE_POSTS,
          data: response.data
        }),
      error => {
        dispatch({
          type: REQUEST_POSTS_ERROR,
          error: error.message
        });
      }
    );
  };
}

export function fetchPost(id) {
  return dispatch => {
    dispatch({
      type: REQUEST_POSTS
    });
    axios.get(`posts/${id}`).then(
      response =>
        dispatch({
          type: REQUEST_POST,
          data: response.data
        }),
      error =>
        dispatch({
          type: REQUEST_POSTS_ERROR,
          error: error.message
        })
    );
  };
}

export function createPost(post, callback) {
  const request = axios.post("posts", post).then(() => callback());

  return {
    type: CREATE_POST,
    payload: request
  };
}
