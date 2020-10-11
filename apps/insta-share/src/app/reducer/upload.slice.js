import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { environment } from '../../environments/environment';
export const UPLOAD_FEATURE_KEY = 'upload';
export const uploadAdapter = createEntityAdapter();

export const fileUploadAction = createAsyncThunk(
  'upload/file',
  async (payload, thunkAPI) => {
    const url = `${environment.API_URL}/util/upload`;
    const response = await fetch(url, {
      method: 'POST',
      body: payload.formData,
      headers: { 'Authorization': `Bearer ${payload.apiKey}`, 'type': 'formData' }
    });
    return response.json();
  }
)

export const getFilesAction = createAsyncThunk(
  'upload/get/files',
  async (payload, thunkAPI) => {
    const url = `${environment.API_URL}/util/files`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({"email": payload.email}),
      headers: { 'Authorization': `Bearer ${payload.apiKey}`, 'Content-Type': 'application/json' }
    });
    return response.json();
  }
)

export const showUploadModalAction = createAsyncThunk(
  'upload/showUploadModal',
  async (payload, thunkAPI) => {
    return payload;
  }
)

export const initialUploadState = uploadAdapter.getInitialState({
  error: null,
  upload: false,
  showUploadModal: false,
  files: [],
  tempFiles: []
});
export const uploadSlice = createSlice({
  name: UPLOAD_FEATURE_KEY,
  initialState: initialUploadState,
  reducers: {
    add: uploadAdapter.addOne,
    remove: uploadAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fileUploadAction.pending, (state, action) => {
        const files = state.files;
        state.tempFiles = files
        state.files = [...files, ...action.meta.arg.data];
      })
    builder
      .addCase(fileUploadAction.fulfilled, (state, action) => {
        if (action.payload && action.payload.status && action.payload.data) {
          const files = state.tempFiles;
          state.files = [...files, ...action.payload.data];
        }
      })
      .addCase(fileUploadAction.rejected, (state, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      })
      .addCase(showUploadModalAction.fulfilled, (state, action) => {
        state.showUploadModal = action.payload;
      })
      .addCase(getFilesAction.fulfilled, (state, action) => {
        state.reload = false;
        if(action.payload && action.payload.data) {
          state.files = [...action.payload.data];
        } else {
          state.files = [];
        }
      })
  },
});
/*
 * Export reducer for store configuration.
 */
export const uploadReducer = uploadSlice.reducer;

export const uploadActions = uploadSlice.actions;
const { selectAll, selectEntities } = uploadAdapter.getSelectors();
export const getUploadState = (rootState) => rootState[UPLOAD_FEATURE_KEY];
export const selectAllUpload = createSelector(getUploadState, selectAll);
export const selectUploadEntities = createSelector(
  getUploadState,
  selectEntities
);
