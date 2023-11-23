import { useParams } from 'react-router-dom'
import { Layout } from 'antd'

import { MainHeader } from '../../components/MainHeader'
import './GameLayout.scss'

function GameLayout() {
  const { quizId } = useParams()

  return (
    <Layout className="layout">
      <Layout className="layout-background">
        <MainHeader />
        <div>{quizId}</div>
      </Layout>
    </Layout>
  )
}

export default GameLayout
