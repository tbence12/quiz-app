import PropTypes from 'prop-types'
import { UserOutlined } from '@ant-design/icons'
import { Layout, Menu, Flex } from 'antd'
import { useSelector } from 'react-redux'

import './MainSider.scss'

const { Sider } = Layout

// LOGOUT

function MainSider({
  collapsed,
  setCollapsed,
  menukey,
  menuItems,
  onMenuItemClick,
}) {
  const { user } = useSelector((state) => state.auth)

  return (
    <Sider
      className="sider"
      theme="dark"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="sider-user-container">
        <Flex className="sider-user" justify="center" align="center">
          {collapsed ? <UserOutlined /> : user.username}
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
  menukey: PropTypes.string,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      children: PropTypes.node,
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
    }),
  ).isRequired,
  onMenuItemClick: PropTypes.func.isRequired,
}

MainSider.defaultProps = {
  menukey: '1',
}

export default MainSider
