import PropTypes from 'prop-types'
import { UserOutlined } from '@ant-design/icons'
import { Layout, Menu, Flex } from 'antd'

import './MainSider.scss'

const { Sider } = Layout

function MainSider({
  collapsed,
  setCollapsed,
  menukey,
  menuItems,
  onMenuItemClick,
}) {
  return (
    <Sider
      className="sider"
      theme="dark"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="sider-user-container">
        <Flex className="sider-user" justify="center" align="center">
          {collapsed ? <UserOutlined /> : 'Username'}
        </Flex>
      </div>
      <Menu
        theme="dark"
        selectedKeys={[menukey]}
        mode="inline"
        items={menuItems}
        onClick={onMenuItemClick}
      />
    </Sider>
  )
}

MainSider.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
  menukey: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      children: PropTypes.node,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onMenuItemClick: PropTypes.func.isRequired,
}

export default MainSider
