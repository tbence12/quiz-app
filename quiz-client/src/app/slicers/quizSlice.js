import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Quiz from '../apiCall/Quiz'

export const FetchStatus = {
  LOADING: 'loading',
  IDLE: 'idle',
  FAILED: 'failed',
}

const initialState = {
  quizzes: [],
  status: FetchStatus.IDLE,
  error: null,
  selectedQuiz: null,
}

export const getQuizzes = createAsyncThunk('quiz/getQuizzes', async () => {
  const response = await Quiz.getQuizzes()
  return response.data
})

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    changeSelectedMovie: (state, action) => {
      state.selectedQuiz = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuizzes.pending, (state) => {
        state.status = FetchStatus.LOADING
      })
      .addCase(getQuizzes.fulfilled, (state, action) => {
        state.status = FetchStatus.IDLE
        state.quizzes = action.payload
      })
      .addCase(getQuizzes.rejected, (state, action) => {
        state.status = FetchStatus.FAILED
        if (action.payload) {
          state.error = String(action.payload)
        }
      })
  },
})

export const { changeSelectedMovie } = quizSlice.actions

const quizReducer = quizSlice.reducer

export default quizReducer
