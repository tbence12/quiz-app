import AxiosClient from './AxiosClient'

const Quiz = {
  getQuizzes: async () => AxiosClient.get('quizzes/questions'),
  getUnfilledQuizzes: async (userId) =>
    AxiosClient.get(`/quizzes/unfilled/${userId}`),
  getQuiz: async (quizId) => AxiosClient.get(`quiz/${quizId}`),
  getQuizWithQuestions: async (userId, quizId) =>
    AxiosClient.get(`quiz/questions/${userId}/${quizId}`),
  editQuiz: async (quizId, quizName) =>
    AxiosClient.put(`quiz/${quizId}`, { name: quizName }),
  deleteQuiz: async (quizId) => AxiosClient.delete(`quiz/${quizId}`),
  restoreQuiz: async (quizId) =>
    AxiosClient.put(`quiz/${quizId}`, { isDeleted: false }),
  addNewQuiz: async (quiz) => AxiosClient.post('quizzes', { ...quiz }),
}

export default Quiz
