import AxiosClient from './AxiosClient'

const Quiz = {
  getQuizzes: async () => AxiosClient.get('quizzes/questions'),
  getQuiz: async (quizId) => AxiosClient.get(`quiz/${quizId}`),
  editQuiz: async (quizId, quizName) =>
    AxiosClient.put(`quiz/${quizId}`, { name: quizName }),
  deleteQuiz: async (quizId) => AxiosClient.delete(`quiz/${quizId}`),
  restoreQuiz: async (quizId) =>
    AxiosClient.put(`quiz/${quizId}`, { isDeleted: false }),
}

export default Quiz
