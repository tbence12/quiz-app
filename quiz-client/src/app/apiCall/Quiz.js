import AxiosClient from './AxiosClient'

const Quiz = {
  getQuizzes: async () => AxiosClient.get('quizzes'),
  getQuiz: async (quizId) => AxiosClient.get(`quiz/${quizId}`),
}

export default Quiz
