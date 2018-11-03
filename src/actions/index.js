import axios from "axios";
import { toastr } from "react-redux-toastr";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const REQUEST_POST = "REQUEST_POST";
export const RECEIVE_POST = "RECEIVE_POST";
export const REQUEST_CREATE_POST = "REQUEST_CREATE_POST";
export const RECEIVE_CREATE_POST = "RECEIVE_CREATE_POST";
export const REQUEST_CREATE_POST_ERROR = "REQUEST_CREATE_POST_ERROR";
export const REQUEST_DELETE_POST = "REQUEST_DELETE_POST";
export const RECEIVE_DELETE_POST = "RECEIVE_DELETE_POST";
export const REQUEST_DELETE_POST_ERROR = "REQUEST_DELETE_POST_ERROR";
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
      type: REQUEST_POST
    });
    axios.get(`posts/${id}`).then(
      response =>
        dispatch({
          type: RECEIVE_POST,
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
  return async dispacth => {
    try {
      dispacth({ type: REQUEST_CREATE_POST });
      const request = await axios.post("posts", post);
      dispacth({ type: RECEIVE_CREATE_POST, data: request.data });
      callback();
    } catch (error) {
      dispacth({ type: REQUEST_CREATE_POST_ERROR, error: error.message });
    }
  };
}

export function deletePost(id) {
  return async dispacth => {
    try {
      dispacth({ type: REQUEST_DELETE_POST, id });
      await axios.delete(`posts/${id}`);
      dispacth({ type: RECEIVE_DELETE_POST, id });
    } catch (error) {
      dispacth({ type: REQUEST_DELETE_POST_ERROR, error: error.message, id });
    }
  };
}
