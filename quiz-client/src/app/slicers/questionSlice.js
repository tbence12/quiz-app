import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { FetchStatus } from '../constants'
import Question from '../apiCall/Question'

const initialState = {
  questions: [],
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
  },
})

const categoryReducer = categorySlice.reducer

export default categoryReducer
