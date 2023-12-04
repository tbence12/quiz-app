import { configureStore } from '@reduxjs/toolkit'
import {
  categoryReducer,
  questionReducer,
  quizReducer,
  userReducer,
} from './slicers'

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    user: userReducer,
    category: categoryReducer,
    question: questionReducer,
  },
})
