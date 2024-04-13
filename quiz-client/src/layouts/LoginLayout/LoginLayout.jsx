import PropTypes from 'prop-types'
import { Layout } from 'antd'
import { MainHeader } from '../../components/MainHeader'
import './LoginLayout.scss'
import { LoginScene } from '../../scenes/LoginScene'

function LoginLayout({ login }) {
  return (
    <Layout className="layout">
      <Layout className="layout-background">
        <MainHeader />
        {login ? <LoginScene /> : <LoginScene />}
      </Layout>
    </Layout>
  )
}

LoginLayout.propTypes = {
  login: PropTypes.bool,
}

LoginLayout.defaultProps = {
  login: true,
}

export default LoginLayout
