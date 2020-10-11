import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { AUTH_FEATURE_KEY, authReducer } from '../reducer/auth.slice';
import StateLoader from '../state-loader';

import { UPLOAD_FEATURE_KEY, uploadReducer } from '../reducer/upload.slice';

const stateLoader = new StateLoader();

export const store = configureStore({
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