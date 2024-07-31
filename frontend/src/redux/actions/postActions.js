import axios from 'axios';
import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  POST_ERROR,
} from './types';

// Get all posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    const errorMsg = err.response && err.response.data ? err.response.data : 'Network Error';
    const errorStatus = err.response ? err.response.status : 500;
    dispatch({
      type: POST_ERROR,
      payload: { msg: errorMsg, status: errorStatus },
    });
  }
};

// Get post by ID
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    const errorMsg = err.response && err.response.data ? err.response.data : 'Network Error';
    const errorStatus = err.response ? err.response.status : 500;
    dispatch({
      type: POST_ERROR,
      payload: { msg: errorMsg, status: errorStatus },
    });
  }
};

// Add post
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('http://localhost:5000/api/posts', formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (err) {
    const errorMsg = err.response && err.response.data ? err.response.data : 'Network Error';
    const errorStatus = err.response ? err.response.status : 500;
    dispatch({
      type: POST_ERROR,
      payload: { msg: errorMsg, status: errorStatus },
    });
  }
};

// Update post
export const updatePost = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(`http://localhost:5000/api/posts/${id}`, formData, config);
    dispatch({
      type: UPDATE_POST,
      payload: res.data,
    });
  } catch (err) {
    const errorMsg = err.response && err.response.data ? err.response.data : 'Network Error';
    const errorStatus = err.response ? err.response.status : 500;
    dispatch({
      type: POST_ERROR,
      payload: { msg: errorMsg, status: errorStatus },
    });
  }
};

// Delete post
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`http://localhost:5000/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (err) {
    const errorMsg = err.response && err.response.data ? err.response.data : 'Network Error';
    const errorStatus = err.response ? err.response.status : 500;
    dispatch({
      type: POST_ERROR,
      payload: { msg: errorMsg, status: errorStatus },
    });
  }
};
