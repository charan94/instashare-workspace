import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { AUTH_FEATURE_KEY, authReducer } from './app/reducer/auth.slice';
import StateLoader from './app/state-loader';

import { UPLOAD_FEATURE_KEY, uploadReducer } from './app/reducer/upload.slice';
const stateLoader = new StateLoader();

const store = configureStore({
  reducer: {
    [UPLOAD_FEATURE_KEY]: uploadReducer,
    [AUTH_FEATURE_KEY]: authReducer,
  },
  middleware: [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],
  preloadedState: stateLoader.loadState(),
});

store.subscribe(() => {
  stateLoader.saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
