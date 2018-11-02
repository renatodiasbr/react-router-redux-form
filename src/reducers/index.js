import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as toastReducer } from "react-redux-toastr";
import posts from "./posts";

export default combineReducers({
  posts,
  form: formReducer,
  toastr: toastReducer
});
