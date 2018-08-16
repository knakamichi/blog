import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPosts} from '../actions';

class PostsIndex extends Component {
  // React Lifecycle Method
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    // All Posts are sent as a single object => use lodash map function (objects don`t hve the map function of an array)

    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      );
    });
  }

  render() {
    // console.log(this.props.posts);
    return (
      <div>
        <div className="text-xs-right">
          {/* works just like an <a> tag
            but uses eventhandlers to prevent browser from sending requests to server (like a normal <a> tag)*/}
          <Link className="btn btn-primary" to= "/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {posts: state.posts};
}

export default connect(mapStateToProps, {fetchPosts})(PostsIndex);

// connect(null, {fetchPosts})
//  = function mapDispatchtoProps(dispatch) {
//   return bindActionCreators({fetchPosts}, dispatch);
// }
// why are there two ways?
// there are times when we want to bind different ActionCreators
