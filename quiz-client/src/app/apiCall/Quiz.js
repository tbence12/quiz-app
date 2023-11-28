import AxiosClient from './AxiosClient'

const Quiz = {
  getQuizzes: async () => AxiosClient.get('quizzes'),
}

export default Quiz
