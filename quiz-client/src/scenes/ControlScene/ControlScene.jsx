import {
  OrderedListOutlined,
  QuestionOutlined,
  PieChartOutlined,
} from '@ant-design/icons'
import { Tabs } from 'antd'
import { Scene } from '../../components/Scene'
import { CategoriesTab, QuestionsTab, QuizzesTab } from './components'

function ControlScene() {
  const tabs = [
    {
      label: (
        <span>
          <OrderedListOutlined />
          Kvízek
        </span>
      ),
      key: '1',
      children: <QuizzesTab />,
    },
    {
      label: (
        <span>
          <QuestionOutlined />
          Kérdések
        </span>
      ),
      key: '2',
      children: <QuestionsTab />,
    },
    {
      label: (
        <span>
          <PieChartOutlined />
          Kategóriák
        </span>
      ),
      key: '3',
      children: <CategoriesTab />,
    },
  ]

  return (
    <Scene title="Kezelő felület">
      <div className="control-tabs">
        <Tabs defaultActiveKey="1" centered items={tabs} />
      </div>
    </Scene>
  )
}

export default ControlScene
