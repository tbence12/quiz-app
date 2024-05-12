import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import User from '../apiCall/User'
import { FetchStatus } from '../constants'

const initialState = {
  userScore: [],
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

export const getUserResults = createAsyncThunk(
  'user/getUserResults',
  async (userId) => {
    const response = await User.getUserResults(userId)
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
      .addCase(getUserResults.pending, (state) => {
        state.status = FetchStatus.LOADING
      })
      .addCase(getUserResults.fulfilled, (state, action) => {
        state.status = FetchStatus.IDLE
        state.userScore = action.payload
      })
      .addCase(getUserResults.rejected, (state, action) => {
        state.status = FetchStatus.FAILED
        if (action.payload) {
          state.error = String(action.payload)
        }
      })
  },
})

const userReducer = userSlice.reducer

export default userReducer
