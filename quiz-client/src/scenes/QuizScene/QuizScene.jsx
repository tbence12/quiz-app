import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Skeleton } from 'antd'
import { Scene } from '../../components/Scene'
import { getQuiz } from '../../app/slicers/quizSlice'
import { FetchStatus } from '../../app/constants'
import { FallbackScene } from '../FallbackScene'
import './QuizScene.scss'

function QuizScene() {
  const { quizId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedQuiz, status } = useSelector((state) => state.quiz)
  const quizIsLoading = status === FetchStatus.LOADING

  useEffect(() => {
    if (!selectedQuiz || selectedQuiz._id !== quizId) {
      dispatch(getQuiz(quizId))
    }
  }, [dispatch, quizId, selectedQuiz])

  const startQuiz = (startedQuizId) => {
    navigate(`/game/${startedQuizId}`)
  }

  if (!selectedQuiz) {
    return <FallbackScene />
  }

  return (
    <Scene title={selectedQuiz?.name}>
      <Skeleton loading={quizIsLoading}>
        <Button type="primary" onClick={() => startQuiz(quizId)}>
          Start Quiz
        </Button>
        <br />
        (A gomb megnyomása után egyből indul a kvíz)
      </Skeleton>
    </Scene>
  )
}

export default QuizScene
