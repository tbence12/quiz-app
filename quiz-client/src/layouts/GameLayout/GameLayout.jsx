import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Layout, Skeleton } from 'antd'
import { MainHeader } from '../../components/MainHeader'
import GameScene from '../../scenes/GameScene/GameScene'
import { getQuizWithQuestions } from '../../app/slicers/quizSlice'
import './GameLayout.scss'

function GameLayout() {
  const { gameQuiz, loading } = useSelector((state) => state.quiz)
  const { quizId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      getQuizWithQuestions({ userId: '6440e65eeb256de3ad346911', quizId }),
    )
  }, [dispatch, quizId])

  return (
    <Layout className="layout">
      <Layout className="layout-background">
        <MainHeader />
        <Skeleton loading={loading}>
          {gameQuiz && <GameScene quiz={gameQuiz} />}
        </Skeleton>
      </Layout>
    </Layout>
  )
}

export default GameLayout
