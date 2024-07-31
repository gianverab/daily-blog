import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../redux/actions/postActions';
import PostItem from './PostItem';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

const PostList = ({ getPosts, posts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (!posts.length) {
    return (
      <>
      <p>No blog posts available.</p>
        <Link to="/posts/create">
        <button>Create New Post</button>
      </Link>
      </>
    ) 
  }

  return (
    <div>
      <h2>Blog Posts</h2>
      <Link to="/posts/create">
        <button>Create New Post</button>
      </Link>
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
