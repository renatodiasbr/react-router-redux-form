import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchPosts } from "../actions";

class PostIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    const { posts } = this.props;
    return _.map(posts.data, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
          <input
            type="button"
            value="Delete"
            className="btn btn-sm btn-danger float-right"
          />
        </li>
      );
    });
  }

  render() {
    const { posts } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12 text-right">
            <Link className="btn btn-primary" to="/post/new">
              New
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h3>
              Posts{" "}
              {posts.isFetching && <FontAwesomeIcon icon="spinner" spin />}
            </h3>
            {posts.error && (
              <div className="alert alert-danger" role="alert">
                An error has occurred while processing your request. Message:
                {" " + posts.error}
              </div>
            )}
            <ul className="list-group">{this.renderPosts()}</ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

export default connect(
  mapStateToProps,
  {
    fetchPosts
  }
)(PostIndex);
