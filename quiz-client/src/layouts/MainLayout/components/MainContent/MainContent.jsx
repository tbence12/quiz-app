import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from 'antd'

import { QuizScene } from '../../../../scenes/QuizScene'
import { ResultScene } from '../../../../scenes/ResultScene'
import { ScoreScene } from '../../../../scenes/ScoreScene'
import { ControlScene } from '../../../../scenes/ControlScene'
import { NotFoundScene } from '../../../../scenes/NotFoundScene'
import './MainContent.scss'

const { Content } = Layout

function MainContent() {
  return (
    <Content className="content">
      <Routes>
        <Route path="/" element={<Navigate replace to="/quiz" />} />
        <Route path="/quiz" element={<QuizScene />} />
        <Route path="/result" element={<ResultScene />} />
        <Route path="/score" element={<ScoreScene />} />
        <Route path="/control" element={<ControlScene />} />
        <Route path="/*" element={<NotFoundScene />} />
      </Routes>
    </Content>
  )
}

export default MainContent
