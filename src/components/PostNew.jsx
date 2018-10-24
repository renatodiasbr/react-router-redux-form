import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class PostNew extends Component {
  renderInputText(field) {
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
            className="form-control"
          />
          {field.meta.error}
        </div>
      </div>
    );
  }

  onSubmit = values => {
    console.log(values);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
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
      </form>
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

export default reduxForm({ validate, form: "PostNew" })(PostNew);
