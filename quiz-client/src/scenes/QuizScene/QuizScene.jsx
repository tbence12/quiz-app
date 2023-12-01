import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from 'antd'
import { QuizCard } from '../../components/QuizCard'
import { Scene } from '../../components/Scene'
import { getQuizzes } from '../../app/slicers/quizSlice'
import { FetchStatus } from '../../app/constants'

import './QuizScene.scss'

function QuizScene() {
  const { quizzes, status } = useSelector((state) => state.quiz)
  const quizIsLoading = status === FetchStatus.LOADING
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getQuizzes())
  }, [dispatch])

  const goToQuiz = (quizId) => {
    navigate(`/game/${quizId}`)
  }
  const quizCardItems = quizzes.map((quiz) => {
    // eslint-disable-next-line no-underscore-dangle
    const quizId = quiz._id

    return (
      <QuizCard
        key={quizId}
        quizTitle={quiz.name}
        questionIds={quiz.questionIds}
        onClick={() => goToQuiz(quizId)}
      />
    )
  })

  return (
    <Scene title="Kvíz lista">
      <Skeleton loading={quizIsLoading}>
        <div className="quiz-card-container">{quizCardItems}</div>
      </Skeleton>
    </Scene>
  )
}

export default QuizScene
