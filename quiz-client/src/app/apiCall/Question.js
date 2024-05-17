import AxiosClient from './AxiosClient'

const Question = {
  getQuestions: async () => AxiosClient.get('questions/categories'),
  getRawQuestions: async () => AxiosClient.get('questions'),
  addNewQuestion: async (question) =>
    AxiosClient.post('questions', { ...question }),
}

export default Question
