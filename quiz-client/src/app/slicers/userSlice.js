import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import User from '../apiCall/User'
import { FetchStatus } from '../constants'

const initialState = {
  usersScore: [],
  status: FetchStatus.IDLE,
  error: null,
}

export const getUsersResults = createAsyncThunk(
  'user/getUsersResults',
  async () => {
    const response = await User.getUsersResults()
    return response.data
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersResults.pending, (state) => {
        state.status = FetchStatus.LOADING
      })
      .addCase(getUsersResults.fulfilled, (state, action) => {
        state.status = FetchStatus.IDLE
        state.usersScore = action.payload
      })
      .addCase(getUsersResults.rejected, (state, action) => {
        state.status = FetchStatus.FAILED
        if (action.payload) {
          state.error = String(action.payload)
        }
      })
  },
})

const userReducer = userSlice.reducer

export default userReducer
