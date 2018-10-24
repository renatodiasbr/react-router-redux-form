import _ from "lodash";
import { FETCH_POSTS } from "../actions";

const postsInitialState = {};

const posts = (state = postsInitialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, "id");
    default:
      return state;
  }
};

export default posts;
