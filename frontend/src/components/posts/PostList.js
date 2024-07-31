import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../redux/actions/postActions';
import PostItem from './PostItem';
import Pagination from './Pagination';

const PostList = ({ getPosts, posts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (!posts.length) {
    return <p>No blog posts available.</p>;
  }

  return (
    <div>
      {posts.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
      <Pagination />
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { getPosts })(PostList);
