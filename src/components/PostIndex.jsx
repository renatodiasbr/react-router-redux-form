import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import { fetchPosts } from "../actions";
import { Alert } from ".";

class PostIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts.data, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/post/${post.id}`}> {post.title} </Link>{" "}
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
              Posts
              {this.props.posts.isFetching && <span> (Loading ...)</span>}
            </h3>
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
