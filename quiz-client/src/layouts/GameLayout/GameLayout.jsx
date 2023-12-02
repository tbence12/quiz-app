import { useParams } from 'react-router-dom'
import { Layout } from 'antd'
import { MainHeader } from '../../components/MainHeader'
import GameScene from '../../scenes/GameScene/GameScene'
import './GameLayout.scss'

function GameLayout() {
  const { quizId } = useParams()

  return (
    <Layout className="layout">
      <Layout className="layout-background">
        <MainHeader />
        <GameScene quizId={quizId} />
      </Layout>
    </Layout>
  )
}

export default GameLayout
