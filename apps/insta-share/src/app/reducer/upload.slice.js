import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { environment } from '../../environments/environment';
import { saveAs } from 'file-saver';

export const UPLOAD_FEATURE_KEY = 'upload';
export const uploadAdapter = createEntityAdapter();

export const fileUploadAction = createAsyncThunk(
  'upload/file/upload',
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
  'upload/files/get',
  async (payload, thunkAPI) => {
    const url = `${environment.API_URL}/util/files`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ "email": payload.email }),
      headers: { 'Authorization': `Bearer ${payload.apiKey}`, 'Content-Type': 'application/json' }
    });
    return response.json();
  }
)

export const fileDownloadAction = createAsyncThunk(
  'upload/attachment/download',
  async (payload, thunkAPI) => {
    console.log('payload ', payload);
    const url = `${environment.API_URL}/util/file/${payload.id}`;
    const response = await fetch(url, {
      method: 'GET',

      headers: { 'Authorization': `Bearer ${payload.apiKey}`, 'Content-Type': 'application/json' }
    });
    return response.json();
  }
)

export const fileDeleteAction = createAsyncThunk(
  'upload/file/delete',
  async (payload, thunkAPI) => {
    console.log('payload ', payload);
    const url = `${environment.API_URL}/util/file/delete/${payload.id}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${payload.apiKey}` }
    });
    return response.json();
  }
)

export const initialUploadState = uploadAdapter.getInitialState({
  error: null,
  upload: false,
  files: [],
  tempFiles: [],
  editFile: null
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
      .addCase(getFilesAction.fulfilled, (state, action) => {
        state.reload = false;
        if (action.payload && action.payload.data) {
          state.files = [...action.payload.data];
        } else {
          state.files = [];
        }
      })
      .addCase(fileUploadAction.pending, (state, action) => {
        const files = state.files;
        state.tempFiles = files
        state.files = [...files, ...action.meta.arg.data];
      })
      .addCase(fileUploadAction.fulfilled, (state, action) => {
        if (action.payload && action.payload.status && action.payload.data) {
          const files = state.tempFiles;
          state.files = [...files, ...action.payload.data];
        }
      })
      .addCase(fileDeleteAction.pending, (state, action) => {
        console.log('action ', action);
        const files = state.files.filter(r => r.id === action.meta.arg.data.id);
        state.files = state.tempFiles = [...files]
      })
      .addCase(fileDeleteAction.fulfilled, (state, action) => {
        console.log('action ', action);
        if (action.payload && action.payload.status) {
          const files = state.files;
          state.files = [...files.filter(r => r.id !== action.payload.id)]
        }
      })
      .addCase(fileDownloadAction.fulfilled, (state, action) => {
        if (action.payload && action.payload.data && action.payload.data.file) {
          const dataURI = `data:text/zip;base64,${action.payload.data.file}`;
          const fileName = action.payload.data.fileName;
          saveAs(dataURI, `${fileName.substring(0, fileName.lastIndexOf('.'))}.zip`);
        }
      })

  },
});

export const uploadReducer = uploadSlice.reducer;

export const uploadActions = uploadSlice.actions;
const { selectAll, selectEntities } = uploadAdapter.getSelectors();
export const getUploadState = (rootState) => rootState[UPLOAD_FEATURE_KEY];
export const selectAllUpload = createSelector(getUploadState, selectAll);
export const selectUploadEntities = createSelector(
  getUploadState,
  selectEntities
);
