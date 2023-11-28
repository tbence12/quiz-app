import { configureStore } from '@reduxjs/toolkit'
import quizReducer from './slicers/quizSlice'

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
})
