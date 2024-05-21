import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from 'antd'
import { FallbackScene } from '../../../../scenes/FallbackScene'
import { AdminRoute } from '../../../../components/AdminRoute'
import './MainContent.scss'

const { Content } = Layout

const QuizzesScene = lazy(() =>
  import('../../../../scenes/QuizzesScene/QuizzesScene'),
)
const QuizScene = lazy(() => import('../../../../scenes/QuizScene/QuizScene'))
const ResultsScene = lazy(() =>
  import('../../../../scenes/ResultsScene/ResultsScene'),
)
const ScoresScene = lazy(() =>
  import('../../../../scenes/ScoresScene/ScoresScene'),
)
const CreatorScene = lazy(() =>
  import('../../../../scenes/CreatorScene/CreatorScene'),
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
          <Route path="/" element={<Navigate replace to="/quizzes" />} />
          <Route path="/quizzes" element={<QuizzesScene />} />
          <Route path="/quiz/:quizId" element={<QuizScene />} />
          <Route path="/results" element={<ResultsScene />} />
          <Route path="/scores" element={<ScoresScene />} />
          <Route path="/creator" element={<CreatorScene />} />
          <Route path="/control" element={<AdminRoute />}>
            <Route path="/control" element={<ControlScene />} />
          </Route>
          <Route path="/*" element={<NotFoundScene />} />
        </Routes>
      </Suspense>
    </Content>
  )
}

export default MainContent
