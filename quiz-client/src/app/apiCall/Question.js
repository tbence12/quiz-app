import AxiosClient from './AxiosClient'

const Question = {
  getQuestions: async () => AxiosClient.get('questions/categories'),
  getRawQuestions: async () => AxiosClient.get('questions'),
  addNewQuestion: async (question) =>
    AxiosClient.post('questions', { ...question }),
  generateQuestions: async (question) =>
    AxiosClient.post('questions/generate', { ...question }),
}

export default Question
