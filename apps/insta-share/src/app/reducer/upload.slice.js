import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
export const UPLOAD_FEATURE_KEY = 'upload';
export const uploadAdapter = createEntityAdapter();

export const fileUploadAction = createAsyncThunk(
  'upload/file',
  async (payload, thunkAPI) => {
    return null;
  }
)

export const showUploadModalAction = createAsyncThunk(
  'upload/showUploadModal',
  (payload, thunkAPI) => {
    return payload;
  }
)

export const initialUploadState = uploadAdapter.getInitialState({
  error: null,
  upload: false,
  showUploadModal: false,
  files: []
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
        
      })
      .addCase(fileUploadAction.fulfilled, (state, action) => {
        uploadAdapter.setAll(state, action.payload);
      })
      .addCase(fileUploadAction.rejected, (state, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      })
      .addCase(showUploadModalAction.fulfilled, (state, action) => {
        state.showUploadModal = action.payload;
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
