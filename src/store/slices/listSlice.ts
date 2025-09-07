import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ListState } from '../../types';
import { fetchListData } from '../../services/api';

export const fetchList = createAsyncThunk(
  'list/fetchList',
  async () => {
    const response = await fetchListData();
    return response;
  }
);

const initialState: ListState = {
  items: [],
  loading: false,
  error: null,
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching data';
      });
  },
});

export default listSlice.reducer;