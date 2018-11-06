import React, { Component } from "react";
import "bootstrap/dist/js/bootstrap";
import $ from "jquery";
import { connect } from "react-redux";
import { confirm } from "../actions/confirmDialog";

class ConfirmDialog extends Component {
  componentDidMount() {
    const { isVisible } = this.props.confirmDialog;
    if (isVisible) $("#modal").modal("show");
    $("#modal").on("hidden.bs.modal", () => {
      const { isConfirmed, callback } = this.props.confirmDialog;
      if (isConfirmed) callback();
      this.props.confirm({ isVisible: false, isConfirmed: false });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.confirmDialog.isVisible) $("#modal").modal("show");
    else $("#modal").modal("hide");
  }

  componentWillUnmount() {
    $("#modal").off("hidden.bs.modal");
    $("#modal").modal("dispose");
  }

  onConfirm = () => {
    this.props.confirm({ isVisible: false, isConfirmed: true });
  };

  render() {
    const { title, bodyText, btnLabel } = this.props.confirmDialog;
    return (
      <div className="modal fade" tabIndex="-1" role="dialog" id="modal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{bodyText}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onConfirm}
              >
                {btnLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ confirmDialog: state.confirmDialog });
const mapDispatchToProps = { confirm };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmDialog);
