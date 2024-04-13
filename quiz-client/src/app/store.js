import { configureStore } from '@reduxjs/toolkit'
import {
  authReducer,
  categoryReducer,
  questionReducer,
  quizReducer,
  userReducer,
} from './slicers'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    question: questionReducer,
    quiz: quizReducer,
    user: userReducer,
  },
})
