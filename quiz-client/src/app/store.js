import { configureStore } from '@reduxjs/toolkit'
import { quizReducer, userReducer } from './slicers'

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    user: userReducer,
  },
})
