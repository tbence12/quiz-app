import { addNewQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion } from "../controllers/questionController";

const questionRoutes = (app) => {
  app.route('/questions')
    .get(getQuestions)
    .post(addNewQuestion);
  
  app.route('/question/:questionId')
    .get(getQuestionById)
    .put(updateQuestion)
    .delete(deleteQuestion);
}

export default questionRoutes;
