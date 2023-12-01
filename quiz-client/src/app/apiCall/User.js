import AxiosClient from './AxiosClient'

const User = {
  getUsersResults: async () => AxiosClient.get('users/results'),
}

export default User
