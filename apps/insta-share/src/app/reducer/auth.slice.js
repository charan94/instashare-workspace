import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { environment } from '../../environments/environment';
export const AUTH_FEATURE_KEY = 'auth';
export const authAdapter = createEntityAdapter();

export const loginAction = createAsyncThunk(
  'auth/login',
  async (payload, thunkAPI) => {
    const url = `${environment.API_URL}/auth/login`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
    return await response.json();
  }
);

export const triggerLogout = createAsyncThunk(
  'auth/logout',
  (payload, thunkAPI) => {
    return payload ? payload : null;
  }
)

export const registerAction = createAsyncThunk(
  'auth/register',
  async (payload, thunkAPI) => {
    const url = `${environment.API_URL}/auth/register`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
    return await response.json();
  }
)

export const updateError = createAsyncThunk(
  'auth/error',
  (payload, thunkAPI) => {
    return payload;    
  }
)

export const initialAuthState = authAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
  user: null,
  isAuthenticated: false,
  token: null
});

export const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState: initialAuthState,
  reducers: {
    add: authAdapter.addOne,
    remove: authAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.statusCode && action.payload.statusCode !== 200) {
            state.isAuthenticated = false;
            state.error = 'Invalid username or password';
          } else {
            const user = {
              email: action.payload && action.payload.email ? action.payload.email : '',
              firstName: action.payload && action.payload.firstName ? action.payload.firstName : '',
              lastName: action.payload && action.payload.lastName ? action.payload.lastName : '',
            }
            const token = action.payload && action.payload.token ? action.payload.token.accessToken : null;
            state.token = token;
            localStorage.setItem('auth_token', token);
            state.isAuthenticated = token !== null ? true : false;
            state.user = user;
            state.error = null;
          }
        }
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isAuthenticated = false;
      })
      .addCase(triggerLogout.fulfilled, (state, action) => {
        if (action.payload) {
          state.error = null;
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;
        }
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.error) {
            state.isAuthenticated = false;
            state.error = action.payload.error;
          } else {
            const user = {
              email: action.payload && action.payload.email ? action.payload.email : '',
              firstName: action.payload && action.payload.firstName ? action.payload.firstName : '',
              lastName: action.payload && action.payload.lastName ? action.payload.lastName : '',
            }
            const token = action.payload && action.payload.token ? action.payload.token.accessToken : null;
            state.token = token;
            localStorage.setItem('auth_token', token);
            state.isAuthenticated = token !== null ? true : false;
            state.user = user;
            state.error = null;
          }
        }
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.isAuthenticated = false;
      })
      .addCase(updateError.fulfilled, (state, action) => {
        if(action.payload) {
          state.error = null;
        }
      });
  },
});

export const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;

const { selectAll, selectEntities } = authAdapter.getSelectors();
export const getAuthState = (rootState) => rootState[AUTH_FEATURE_KEY];
export const selectAllAuth = createSelector(getAuthState, selectAll);
export const selectAuthEntities = createSelector(getAuthState, selectEntities);
