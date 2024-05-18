import { useNavigate } from 'react-router-dom'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, message } from 'antd'
import { Scene } from '../../components/Scene'
import Auth from '../../app/apiCall/Auth'

import './RegisterScene.scss'

function RegisterScene() {
  const navigate = useNavigate()

  const goToLogin = () => {
    navigate('/login')
  }

  const register = async (values) => {
    try {
      await Auth.registerUser(values)
      message.success('Sikeres regisztráció!')
      goToLogin()
    } catch (error) {
      console.log('error: ', error)
      message.error('Sikertelen regisztráció!')
    }
  }

  return (
    <Scene title="Regisztráció">
      <div className="form-container">
        <Form name="normal_login" className="login-form" onFinish={register}>
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
            name="email"
            rules={[
              {
                required: true,
                message: 'Kérlek írd be megfelelően az emailed!',
                type: 'email',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
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
          <Form.Item
            name="year"
            label="Születési év"
            rules={[
              {
                required: true,
                message: 'Kérlek írd be a születési éved!',
                type: 'number',
                min: 1900,
                max: 2020,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Regisztrálás
            </Button>
            <span className="login-register">
              Ha van már felhasználód,{' '}
              <Button
                type="link"
                className="register-link"
                onClick={() => goToLogin()}
              >
                jelentkezz be!
              </Button>
            </span>
          </Form.Item>
        </Form>
      </div>
    </Scene>
  )
}

export default RegisterScene
