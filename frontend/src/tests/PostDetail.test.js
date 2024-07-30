import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PostDetail from '../components/posts/PostDetail';

const mockStore = configureStore([]);

test('renders PostDetail component', () => {
  const store = mockStore({
    posts: {
      post: { _id: '1', title: 'First Post', content: 'First Content' },
    },
  });

  render(
    <Provider store={store}>
      <PostDetail match={{ params: { id: '1' } }} />
    </Provider>
  );

  expect(screen.getByText(/First Post/i)).toBeInTheDocument();
  expect(screen.getByText(/First Content/i)).toBeInTheDocument();
});
