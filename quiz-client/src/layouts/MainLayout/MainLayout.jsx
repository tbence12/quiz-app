import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
import { MainContent } from './components/MainContent'
import './MainLayout.scss'

const getItem = (label, key, icon, path, children) => {
  return {
    key,
    icon,
    children,
    label,
    path,
  }
}

const siderMenuItems = [
  getItem('Kvízek', '1', <DesktopOutlined />, '/quiz'),
  getItem('Eredményeim', '2', <UserOutlined />, '/result'),
  getItem('Pontlista', '3', <TeamOutlined />, '/score'),
  getItem('Kezelő', '4', <FileOutlined />, '/control'),
  getItem('Kijelentkezés', '0', <LogoutOutlined />, '/'),
]

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [siderMenuKey, setSiderMenuKey] = useState('1')

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { width } = useViewport()
  const breakpoint = 620

  useEffect(() => {
    if (pathname === '/') {
      return
    }

    const item = siderMenuItems.find(
      (siderMenuItem) => siderMenuItem.path === pathname,
    )

    setSiderMenuKey(item?.key)
  }, [pathname])

  useEffect(() => {
    if (width < breakpoint) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [width])

  const handleOnMenuItemClick = (item) => {
    const { key } = item
    if (key === '0') {
      // eslint-disable-next-line no-console
      console.log('Kijelentkezés')
      return
    }
    const menuItem = siderMenuItems.find(
      (siderMenuItem) => siderMenuItem.key === key,
    )
    navigate(menuItem?.path)
    setSiderMenuKey(key)
  }

  return (
    <Layout className="layout">
      <Layout className="layout-background">
        <MainHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <MainContent />
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
