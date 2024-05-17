import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { Scene } from '../../components/Scene'
import { getUserStatus } from '../../app/slicers/authSlice'

import './LoginScene.scss'
import Auth from '../../app/apiCall/Auth'

function LoginScene() {
  // const { status } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const login = async (values) => {
    const { username, password } = values
    try {
      await Auth.loginUser(username, password)
      dispatch(getUserStatus(values))
      message.success('Sikeres bejelentkezés!')
      navigate('/quizzes')
    } catch (error) {
      console.log('error: ', error)
      message.error('Sikertelen bejelentkezés!')
    }
  }

  const goToRegistration = () => {
    navigate('/register')
  }

  // const checkUser = useCallback(async () => {
  //   if (localStorage.getItem('user')) {
  //     try {
  //       await dispatch(getUserStatus())
  //       navigate('/quizzes')
  //     } catch (error) {
  //       message.error('Sikertelen felhasználó azonosítás, jelentkezz be újra!')
  //     }
  //   }
  // }, [dispatch, navigate])

  return (
    <Scene title="Bejelentkezés">
      <div className="form-container">
        <Form name="normal_login" className="login-form" onFinish={login}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Kérlek írd be a felhasználóneved!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Felhasználónév"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Kérlek írd be a jelszavad!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Jelszó"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Bejelentkezés
            </Button>
            <span className="login-register">
              Vagy{' '}
              <Button
                type="link"
                className="register-link"
                onClick={() => goToRegistration()}
              >
                regisztrálj most!
              </Button>
            </span>
          </Form.Item>
        </Form>
      </div>
    </Scene>
  )
}

export default LoginScene
