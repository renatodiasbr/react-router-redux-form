import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createPost } from "../actions";

class PostNew extends Component {
  renderInputText(field) {
    const {
      meta: { touched, error }
    } = field;

    const inputClassName = `form-control ${
      touched && error ? "is-invalid" : ""
    }`;

    return (
      <div className="form-group row">
        <label htmlFor={field.input.name} className="col-12 col-form-label">
          {field.label}
        </label>
        <div className="col-12">
          <input
            {...field.input}
            id={field.input.name}
            type="text"
            className={inputClassName}
          />
          <div className="invalid-feedback">
            {field.meta.touched ? field.meta.error : ""}
          </div>
        </div>
      </div>
    );
  }

  onSubmit = values => {
    this.props.createPost(values, () => this.props.history.push("/"));
  };

  render() {
    const { handleSubmit, posts } = this.props;
    return (
      <React.Fragment>
        <h3>
          New Post {posts.isFetching && <FontAwesomeIcon icon="spinner" spin />}
        </h3>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field name="title" label="Title:" component={this.renderInputText} />
          <Field
            name="categories"
            label="Categories:"
            component={this.renderInputText}
          />
          <Field
            name="content"
            label="Content:"
            component={this.renderInputText}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link className="btn btn-secondary" to="/">
            Cancel
          </Link>
        </form>
      </React.Fragment>
    );
  }
}

function validate(values) {
  let errors = {};

  if (!values.title) {
    errors.title = "Enter a title";
  }

  if (!values.categories) {
    errors.categories = "Enter some categories";
  }

  if (!values.content) {
    errors.content = "Enter some content";
  }

  return errors;
}

export default reduxForm({ validate, form: "PostNew" })(
  connect(
    state => ({ posts: state.posts }),
    { createPost }
  )(PostNew)
);
