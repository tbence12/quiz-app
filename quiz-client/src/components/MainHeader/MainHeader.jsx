import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Button, Col, Layout, Row } from 'antd'

import './MainHeader.scss'

const { Header } = Layout

function MainHeader({ collapsed, setCollapsed }) {
  const collapsable = collapsed !== undefined
  const navigate = useNavigate()

  const goToMainPage = () => {
    navigate('/')
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      goToMainPage()
    }
  }

  return (
    <Header className="header">
      <Row>
        <Col span={8} offset={8}>
          <span
            className="quiz-logo"
            role="button"
            tabIndex="0"
            onClick={() => goToMainPage()}
            onKeyDown={handleKeyPress}
          >
            iQuiz
          </span>
        </Col>
        {collapsable && (
          <Col span={8} className="collaps-button-container">
            <Button
              type="text"
              icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="collaps-button"
              style={{
                width: 64,
                height: 64,
              }}
            />
          </Col>
        )}
      </Row>
    </Header>
  )
}

MainHeader.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
}

MainHeader.defaultProps = {
  collapsed: undefined,
  setCollapsed: () => {},
}

export default MainHeader
