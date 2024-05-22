import axios from 'axios'

const errorStatuses = [401, 403, 404, 500]

const AxiosClient = axios.create()

AxiosClient.defaults.baseURL =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/'
    : 'http://18.199.84.212:4000/'

AxiosClient.defaults.timeout = 60000

AxiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (errorStatuses.includes(error?.response?.status)) {
      // eslint-disable-next-line no-console
      console.error(error.message)
    }
    return Promise.reject(error.message)
  },
)

export default AxiosClient
