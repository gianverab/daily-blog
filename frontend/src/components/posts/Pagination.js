import React from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../redux/actions/postActions';

const Pagination = ({ posts, getPosts }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(posts.length / 5);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleClick = pageNumber => {
    getPosts(pageNumber);
  };

  return (
    <nav>
      <ul>
        {pageNumbers.map(number => (
          <li key={number} onClick={() => handleClick(number)}>
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const mapStateToProps = state => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { getPosts })(Pagination);
