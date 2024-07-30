import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => (
  <div>
    <h3>{post.title}</h3>
    <p>{post.content}</p>
    <Link to={`/posts/${post._id}`}>Read More</Link>
  </div>
);

export default PostItem;
