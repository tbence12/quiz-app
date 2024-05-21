import { addNewQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz, getUnfilledQuizzes, getQuizWithQuestions, getQuizzesWithQuestions } from "../controllers/quizController";

const quizRoutes = (app) => {
  app.route('/quizzes')
    .get(getQuizzes)
    .post(addNewQuiz);

  app.route('/quizzes/questions')
    .get(getQuizzesWithQuestions);
    
  app.route('/quiz/:quizId')
  .get(getQuizById)
  .put(updateQuiz)
  .delete(deleteQuiz);

  app.route('/quizzes/unfilled/:userId')
    .get(getUnfilledQuizzes);
  
  app.route('/quiz/questions/:userId/:quizId')
    .get(getQuizWithQuestions);
}

export default quizRoutes;
