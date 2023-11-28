import { Layout, Spin } from 'antd'

import { MainHeader } from '../../components/MainHeader'
import './FallbackLayout.scss'

function FallbackLayout() {
  return (
    <Layout className="layout">
      <Layout className="layout-background">
        <MainHeader />
        <Spin size="large" />
      </Layout>
    </Layout>
  )
}

export default FallbackLayout
