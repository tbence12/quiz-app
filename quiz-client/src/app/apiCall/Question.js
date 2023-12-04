import AxiosClient from './AxiosClient'

const Question = {
  getQuestions: async () => AxiosClient.get('questions/categories'),
}

export default Question
