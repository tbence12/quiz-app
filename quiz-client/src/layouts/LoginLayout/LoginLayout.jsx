import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Layout, message } from 'antd'
import { MainHeader } from '../../components/MainHeader'
import './LoginLayout.scss'
import { LoginScene } from '../../scenes/LoginScene'
import { logoutUser } from '../../app/slicers/authSlice'

function LoginLayout({ login, logout }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user && !logout) {
      navigate('/quizzes')
    }
  }, [navigate, user, logout])

  useEffect(() => {
    if (logout) {
      dispatch(logoutUser())
      message.success('Sikeres kijelentkezés!')
    }
  }, [dispatch, logout])

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
  logout: PropTypes.bool,
}

LoginLayout.defaultProps = {
  login: true,
  logout: false,
}

export default LoginLayout
