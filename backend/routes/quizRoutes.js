import { addNewQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz } from "../controllers/quizController";

const quizRoutes = (app) => {
  app.route('/quizzes')
    .get(getQuizzes)
    .post(addNewQuiz);
  
  app.route('/quiz/:quizId')
    .get(getQuizById)
    .put(updateQuiz)
    .delete(deleteQuiz);
}

export default quizRoutes;
