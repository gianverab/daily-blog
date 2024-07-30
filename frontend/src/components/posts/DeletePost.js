import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost, deletePost } from '../../redux/actions/postActions';

class DeletePost extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPost(id);
  }

  onDelete = () => {
    const { id } = this.props.match.params;
    this.props.deletePost(id);
    this.props.history.push('/');
  };

  render() {
    const { post } = this.props;
    return post ? (
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <button onClick={this.onDelete}>Delete Post</button>
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}

const mapStateToProps = state => ({
  post: state.posts.post,
});

export default connect(mapStateToProps, { getPost, deletePost })(DeletePost);
