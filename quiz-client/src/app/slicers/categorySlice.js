import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { FetchStatus } from '../constants'
import Category from '../apiCall/Category'

const initialState = {
  categories: [],
  loading: false,
  status: FetchStatus.IDLE,
  error: null,
}

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async () => {
    const response = await Category.getCategories()
    return response.data
  },
)

const categorySlice = createSlice({
  name: 'category',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = FetchStatus.LOADING
        state.loading = true
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = FetchStatus.IDLE
        state.loading = false
        state.categories = action.payload
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = FetchStatus.FAILED
        state.loading = false
        if (action.payload) {
          state.error = String(action.payload)
        }
      })
  },
})

const categoryReducer = categorySlice.reducer

export default categoryReducer
