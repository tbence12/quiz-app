import { useEffect, useState } from 'react'
import {
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Layout } from 'antd'

import useViewport from '../../hooks/useViewport'
import { MainHeader } from './components/MainHeader'
import { MainSider } from './components/MainSider'
import './MainLayout.scss'

const { Content } = Layout

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  }
}

const siderMenuItems = [
  getItem('Kvízek', '1', <DesktopOutlined />),
  getItem('Eredményeim', '2', <UserOutlined />),
  getItem('Pontlista', '3', <TeamOutlined />),
  getItem('Kezelő', '4', <FileOutlined />),
  getItem('Kijelentkezés', '5', <LogoutOutlined />),
]

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [siderMenuKey, setSiderMenuKey] = useState('1')

  const { width } = useViewport()
  const breakpoint = 620

  useEffect(() => {
    if (width < breakpoint) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [width])

  const handleOnMenuItemClick = (item) => {
    setSiderMenuKey(item.key)
  }

  return (
    <Layout className="layout">
      <Layout className="layout-background">
        <MainHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="content">{siderMenuKey}</Content>
      </Layout>
      <MainSider
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        menukey={siderMenuKey}
        menuItems={siderMenuItems}
        onMenuItemClick={handleOnMenuItemClick}
      />
    </Layout>
  )
}
export default MainLayout
