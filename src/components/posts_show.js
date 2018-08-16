import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPost, deletePost} from '../actions';

class PostsShow extends Component {
  componentDidMount() {
// .match = this.props.posts .params = returns all possible wildcard urls => since we only want id, params.id
    if (!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
    // this.props.deletePost(this.props.post.id); => since component renders without post info first, this might throw an error
  }

  render() {
    const {post} = this.props;

  // have the component render this first before getting post data.
    if (!post) {
      return <div>Loading... </div>;
    }

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick = {this.onDeleteClick.bind(this)}
          >
        Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories : {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// we basically only want the list of posts. (states don`t need to change)
// ownProps = props object that is headed for the PostsShow component
// つまりここで posts lists 全部受け取り、必要な post のみを props として PostsShow component に渡す。
function mapStateToProps( {posts}, ownProps ) {
  return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);
