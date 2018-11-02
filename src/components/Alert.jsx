import React from "react";

const Alert = ({ cssClass, children }) => {
  return (
    <div
      className={`alert ${cssClass} alert-dismissible fade show`}
      role="alert"
    >
      {children}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Alert;
