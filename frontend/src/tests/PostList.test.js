import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PostList from '../components/posts/PostList';

const mockStore = configureStore([]);

test('renders PostList component', () => {
  const store = mockStore({
    posts: {
      posts: [
        { _id: '1', title: 'First Post', content: 'First Content' },
        { _id: '2', title: 'Second Post', content: 'Second Content' },
      ],
    },
  });

  render(
    <Provider store={store}>
      <PostList />
    </Provider>
  );

  expect(screen.getByText(/First Post/i)).toBeInTheDocument();
  expect(screen.getByText(/Second Post/i)).toBeInTheDocument();
});
