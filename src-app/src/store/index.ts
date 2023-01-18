import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunk, routerMiddleware(window.history))
});

export default store;
