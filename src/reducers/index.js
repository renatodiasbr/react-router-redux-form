import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as toastReducer } from "react-redux-toastr";
import posts from "./posts";
import confirmDialog from "./confirmDialog";

export default combineReducers({
  posts,
  confirmDialog,
  form: formReducer,
  toastr: toastReducer
});
