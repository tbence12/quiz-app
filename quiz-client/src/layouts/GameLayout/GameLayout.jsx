import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Layout, Skeleton } from 'antd'
import { MainHeader } from '../../components/MainHeader'
import GameScene from '../../scenes/GameScene/GameScene'
import { getQuizWithQuestions } from '../../app/slicers/quizSlice'
import './GameLayout.scss'

function GameLayout() {
  const { user } = useSelector((state) => state.auth)
  const { gameQuiz, loading } = useSelector((state) => state.quiz)
  const { quizId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getQuizWithQuestions({ userId: user?._id, quizId }))
  }, [dispatch, quizId, user])

  return (
    <Layout className="layout">
      <Layout className="layout-background">
        <MainHeader />
        <Skeleton loading={loading}>
          {gameQuiz ? (
            <GameScene quiz={gameQuiz} />
          ) : (
            <span className="quiz-not-available">Ez a kvíz nem elérhető</span>
          )}
        </Skeleton>
      </Layout>
    </Layout>
  )
}

export default GameLayout
