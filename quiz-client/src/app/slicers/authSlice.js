import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Auth from '../apiCall/Auth'
import { FetchStatus } from '../constants'

const initialState = {
  user: null,
  loading: false,
  status: FetchStatus.IDLE,
  error: null,
}

export const getUserStatus = createAsyncThunk(
  'auth/getUserStatus',
  async () => {
    const response = await Auth.getUserStatus()
    return response.data
  },
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { dispatch }) => {
    try {
      await Auth.loginUser(username, password)
      dispatch(getUserStatus())
    } catch (error) {
      throw Error(error)
    }
  },
)

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await Auth.logoutUser()
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserStatus.pending, (state) => {
        state.status = FetchStatus.LOADING
        state.loading = true
      })
      .addCase(getUserStatus.fulfilled, (state, action) => {
        state.status = FetchStatus.IDLE
        state.loading = false
        const { user } = action.payload
        state.user = user
        localStorage.setItem('user', JSON.stringify(user))
      })
      .addCase(getUserStatus.rejected, (state, action) => {
        state.status = FetchStatus.FAILED
        state.loading = false
        if (action.payload) {
          state.error = String(action.payload)
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.status = FetchStatus.LOADING
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = FetchStatus.IDLE
        state.loading = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = FetchStatus.FAILED
        state.loading = false
        if (action.payload) {
          state.error = String(action.payload)
        }
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = FetchStatus.LOADING
        state.loading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = FetchStatus.IDLE
        state.loading = false
        state.user = null
        localStorage.removeItem('user')
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = FetchStatus.FAILED
        state.loading = false
        if (action.payload) {
          state.error = String(action.payload)
        }
      })
  },
})

const authReducer = authSlice.reducer

export default authReducer
