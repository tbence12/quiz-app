import AxiosClient from './AxiosClient'

const User = {
  getUsersResults: async () => AxiosClient.get('users/results'),
  getUserResults: async (userId) => AxiosClient.get(`results/${userId}`),
}

export default User
