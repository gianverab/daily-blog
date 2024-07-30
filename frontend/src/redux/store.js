import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import postReducer from './reducers/postReducer';

const rootReducer = {
    auth: authReducer,
    posts: postReducer,
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
