import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { FetchStatus } from '../constants'
import Question from '../apiCall/Question'

const initialState = {
  questions: [],
  rawQuestions: [],
  loading: false,
  status: FetchStatus.IDLE,
  error: null,
}

export const getQuestions = createAsyncThunk(
  'question/getQuestions',
  async () => {
    const response = await Question.getQuestions()
    return response.data
  },
)

export const getRawQuestions = createAsyncThunk(
  'question/getRawQuestions',
  async () => {
    const response = await Question.getRawQuestions()
    return response.data
  },
)

const categorySlice = createSlice({
  name: 'question',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.status = FetchStatus.LOADING
        state.loading = true
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.status = FetchStatus.IDLE
        state.loading = false
        state.questions = action.payload
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.status = FetchStatus.FAILED
        state.loading = false
        if (action.payload) {
          state.error = String(action.payload)
        }
      })
      .addCase(getRawQuestions.pending, (state) => {
        state.status = FetchStatus.LOADING
        state.loading = true
      })
      .addCase(getRawQuestions.fulfilled, (state, action) => {
        state.status = FetchStatus.IDLE
        state.loading = false
        state.rawQuestions = action.payload
      })
      .addCase(getRawQuestions.rejected, (state, action) => {
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
