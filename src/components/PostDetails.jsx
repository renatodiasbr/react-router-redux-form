import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchPost } from "../actions";

class PostDetails extends Component {
  componentDidMount() {
    this.props.fetchPost();
  }

  render() {
    const { post, isFetching } = this.props;

    if (!post) {
      return <div>Loading ...</div>;
    }

    return (
      <div>
        <h3>Post Details {isFetching && <span>(Loading ...)</span>}</h3>
        <div className="row">
          <div className="col-12">
            <dl className="row">
              <dt className="col-2">Title</dt>
              <dd className="col-10">{post.title}</dd>
              <dt className="col-2">Categories</dt>
              <dd className="col-10">{post.categories}</dd>
              <dt className="col-2">Content</dt>
              <dd className="col-10">{post.content}</dd>
            </dl>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Link className="btn btn-primary" to="/">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.posts.data[ownProps.match.params.id],
    isFetching: state.posts.isFetching
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchPost: () => {
      dispatch(fetchPost(ownProps.match.params.id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails);
