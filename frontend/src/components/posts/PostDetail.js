import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../redux/actions/postActions';

const PostDetail = ({ getPost, post, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return post ? (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

const mapStateToProps = state => ({
  post: state.posts.post,
});

export default connect(mapStateToProps, { getPost })(PostDetail);
