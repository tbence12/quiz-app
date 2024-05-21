import axios from 'axios'

const errorStatuses = [401, 403, 404, 500]

const AxiosClient = axios.create()

AxiosClient.defaults.baseURL = 'http://localhost:4000/'

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
