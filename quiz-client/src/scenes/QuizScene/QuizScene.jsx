import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from 'antd'
import { QuizCard } from '../../components/QuizCard'
import { Scene } from '../../components/Scene'
import { FetchStatus, getQuizzes } from '../../app/slicers/quizSlice'

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
  const quizCardItems = quizzes.map((quiz) => (
    // eslint-disable-next-line no-underscore-dangle, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    // <div key={quiz._id} onClick={() => goToQuiz(quiz._id)}>
    //   {quiz.name}
    // </div>
    <QuizCard
      quizTitle={quiz.name}
      questionIds={quiz.questionIds}
      // eslint-disable-next-line no-underscore-dangle
      onClick={() => goToQuiz(quiz._id)}
    />
  ))
  // const quizCardItems = quizzes.map((quiz) => (
  //   <QuizCard quizTitle={quiz.name} questionIds={quiz.questionIds} />
  // ))
  return (
    <Scene title="Kvíz lista">
      <Skeleton loading={quizIsLoading}>
        <div className="quiz-card-container">{quizCardItems}</div>
      </Skeleton>
    </Scene>
  )
}

export default QuizScene
