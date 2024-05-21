import AxiosClient from './AxiosClient'

const Result = {
  addNewResult: async (result) => AxiosClient.post('results', { ...result }),
}

export default Result
