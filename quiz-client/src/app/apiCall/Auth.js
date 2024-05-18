import AxiosClient from './AxiosClient'

const Auth = {
  loginUser: async (username, password) =>
    AxiosClient.post(
      'login',
      { username, password },
      { withCredentials: true },
    ),
  logoutUser: async () =>
    AxiosClient.post('logout', {}, { withCredentials: true }),
  getUserStatus: async () =>
    AxiosClient.get('status', { withCredentials: true }),
  registerUser: async (user) =>
    AxiosClient.post('users', { ...user }, { withCredentials: true }),
}

export default Auth
