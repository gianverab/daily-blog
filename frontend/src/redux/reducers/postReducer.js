import {
    GET_POSTS,
    GET_POST,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    POST_ERROR,
  } from '../actions/types';
  
  const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {},
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_POSTS:
        return {
          ...state,
          posts: payload,
          loading: false,
        };
      case GET_POST:
        return {
          ...state,
          post: payload,
          loading: false,
        };
      case ADD_POST:
        return {
          ...state,
          posts: [payload, ...state.posts],
          loading: false,
        };
      case UPDATE_POST:
        return {
          ...state,
          posts: state.posts.map(post =>
            post._id === payload._id ? payload : post
          ),
          loading: false,
        };
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter(post => post._id !== payload),
          loading: false,
        };
      case POST_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      default:
        return state;
    }
  }
  