import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from 'antd'
import { FallbackScene } from '../../../../scenes/FallbackScene'

import './MainContent.scss'

const { Content } = Layout

const QuizScene = lazy(() => import('../../../../scenes/QuizScene/QuizScene'))
const ResultScene = lazy(() =>
  import('../../../../scenes/ResultScene/ResultScene'),
)
const ScoreScene = lazy(() =>
  import('../../../../scenes/ScoreScene/ScoreScene'),
)
const ControlScene = lazy(() =>
  import('../../../../scenes/ControlScene/ControlScene'),
)
const NotFoundScene = lazy(() =>
  import('../../../../scenes/NotFoundScene/NotFoundScene'),
)

function MainContent() {
  return (
    <Content className="content">
      <Suspense fallback={<FallbackScene />}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/quiz" />} />
          <Route path="/quiz" element={<QuizScene />} />
          <Route path="/quiz/:id" element={<QuizScene />} />
          <Route path="/result" element={<ResultScene />} />
          <Route path="/score" element={<ScoreScene />} />
          <Route path="/control" element={<ControlScene />} />
          <Route path="/*" element={<NotFoundScene />} />
        </Routes>
      </Suspense>
    </Content>
  )
}

export default MainContent
