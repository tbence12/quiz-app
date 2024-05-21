import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from 'antd'
import { QuizCard } from '../../components/QuizCard'
import { Scene } from '../../components/Scene'
import {
  changeSelectedQuiz,
  getUnfilledQuizzes,
} from '../../app/slicers/quizSlice'
import { FetchStatus } from '../../app/constants'

import './QuizzesScene.scss'

function QuizzesScene() {
  const { user } = useSelector((state) => state.auth)
  const { unfilledQuizzes, status } = useSelector((state) => state.quiz)
  const quizIsLoading = status === FetchStatus.LOADING
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUnfilledQuizzes(user._id))
  }, [dispatch, user._id])

  const goToQuiz = (quiz) => {
    dispatch(changeSelectedQuiz(quiz))
    navigate(`/quiz/${quiz._id}`)
  }

  const quizCardItems = unfilledQuizzes.map((quiz) => {
    return (
      <QuizCard
        key={quiz._id}
        quizTitle={quiz.name}
        questionIds={quiz.questionIds}
        onClick={() => goToQuiz(quiz)}
      />
    )
  })

  return (
    <Scene title="Kvízlista">
      <Skeleton loading={quizIsLoading}>
        <div className="quiz-card-container">{quizCardItems}</div>
      </Skeleton>
    </Scene>
  )
}

export default QuizzesScene
