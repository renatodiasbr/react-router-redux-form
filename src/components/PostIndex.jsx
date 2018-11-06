import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchPosts, deletePost } from "../actions";
import { confirm } from "../actions/confirmDialog";

class PostIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  deletePost = post => {
    this.props.confirm({
      title: "Confirm",
      bodyText: `Do you realy want to delete this post '${post.title}'?`,
      btnLabel: "Delete",
      callback: () => this.props.deletePost(post.id)
    });
  };

  renderPosts() {
    const { posts } = this.props;
    return _.map(posts.data, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/post/${post.id}`}>{post.title}</Link>{" "}
          {post.isDeleting && <FontAwesomeIcon icon="spinner" spin />}
          <input
            type="button"
            value="Delete"
            className="btn btn-sm btn-danger float-right"
            disabled={post.isDeleting}
            onClick={() => this.deletePost(post)}
          />
        </li>
      );
    });
  }

  render() {
    const { posts } = this.props;
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            this.props.confirm({
              title: "Confirm",
              callback: () => console.log("confirmed")
            })
          }
        >
          Launch demo modal
        </button>

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

const mapDispatchToProps = {
  fetchPosts,
  deletePost,
  confirm
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostIndex);
