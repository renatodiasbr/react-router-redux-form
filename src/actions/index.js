import axios from "axios";

export const FETCH_POSTS = "FETCH_POSTS";

const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "?key=258753159";

export function fetchPosts() {
  return {
    type: FETCH_POSTS,
    payload: axios(`${ROOT_URL}/posts${API_KEY}`)
  };
}
