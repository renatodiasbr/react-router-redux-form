import { CONFIRM } from "../actions/confirmDialog";

const initialState = {
  title: "Confirm Dialog",
  bodyText: "Do you realy want to continue?",
  btnLabel: "Continue",
  isVisible: false,
  isConfirmed: false,
  callback: () => {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONFIRM:
      let {
        title,
        bodyText,
        btnLabel,
        callback,
        isVisible,
        isConfirmed
      } = action;
      if (!title) title = initialState.title;
      if (!bodyText) bodyText = initialState.bodyText;
      if (!btnLabel) btnLabel = initialState.btnLabel;
      if (isVisible === undefined) isVisible = true;
      if (isConfirmed === undefined) isConfirmed = false;
      if (!callback || typeof callback !== "function")
        callback = state.callback || initialState.callback;
      return { title, bodyText, btnLabel, callback, isVisible, isConfirmed };
    default:
      return state;
  }
};
