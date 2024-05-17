import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Quiz from '../apiCall/Quiz'
import { FetchStatus } from '../constants'

const initialState = {
  quizzes: [],
  unfilledQuizzes: [],
  status: FetchStatus.IDLE,
  loading: false,
  error: null,
  selectedQuiz: null,
  gameQuiz: null,
}

export const getQuizzes = createAsyncThunk('quiz/getQuizzes', async () => {
  const response = await Quiz.getQuizzes()
  return response.data
})

export const getUnfilledQuizzes = createAsyncThunk(
  'quiz/getUnfilledQuizzes',
  async (userId) => {
    const response = await Quiz.getUnfilledQuizzes(userId)
    return response.data
  },
)

export const getQuiz = createAsyncThunk('quiz/getQuiz', async (quizId) => {
  const response = await Quiz.getQuiz(quizId)
  return response.data
})

export const getQuizWithQuestions = createAsyncThunk(
  'quiz/getQuizWithQuestions',
  async ({ userId, quizId }) => {
    const response = await Quiz.getQuizWithQuestions(userId, quizId)
    return response.data[0]
  },
)

export const editQuiz = createAsyncThunk(
  'quiz/editQuiz',
  async ({ quizId, quizName }, { dispatch }) => {
    await Quiz.editQuiz(quizId, quizName)
    dispatch(getQuizzes())
  },
)

export const deleteQuiz = createAsyncThunk(
  'quiz/deleteQuiz',
  async (quizId, { dispatch }) => {
    await Quiz.deleteQuiz(quizId)
    dispatch(getQuizzes())
  },
)

export const restoreQuiz = createAsyncThunk(
  'quiz/restoreQuiz',
  async (quizId, { dispatch }) => {
    await Quiz.restoreQuiz(quizId)
    dispatch(getQuizzes())
  },
)

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
      .addCase(getQuiz.pending, (state) => {
        state.status = FetchStatus.LOADING
      })
      .addCase(getQuiz.fulfilled, (state, action) => {
        state.status = FetchStatus.IDLE
        state.selectedQuiz = action.payload
      })
      .addCase(getQuiz.rejected, (state, action) => {
        state.status = FetchStatus.FAILED
        if (action.payload) {
          state.error = String(action.payload)
        }
      })
      .addCase(getQuizWithQuestions.pending, (state) => {
        state.status = FetchStatus.LOADING
        state.loading = true
      })
      .addCase(getQuizWithQuestions.fulfilled, (state, action) => {
        state.status = FetchStatus.IDLE
        state.loading = false
        state.gameQuiz = action.payload
      })
      .addCase(getQuizWithQuestions.rejected, (state, action) => {
        state.status = FetchStatus.FAILED
        state.loading = false
        if (action.payload) {
          state.error = String(action.payload)
        }
      })
      .addCase(getUnfilledQuizzes.pending, (state) => {
        state.status = FetchStatus.LOADING
        state.loading = true
      })
      .addCase(getUnfilledQuizzes.fulfilled, (state, action) => {
        state.status = FetchStatus.IDLE
        state.loading = false
        state.unfilledQuizzes = action.payload
      })
      .addCase(getUnfilledQuizzes.rejected, (state, action) => {
        state.status = FetchStatus.FAILED
        state.loading = false
        if (action.payload) {
          state.error = String(action.payload)
        }
      })
  },
})

export const { changeSelectedMovie } = quizSlice.actions

const quizReducer = quizSlice.reducer

export default quizReducer
