import { addNewQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion, getQuestionsWithCategoryName } from "../controllers/questionController";

const questionRoutes = (app) => {
  app.route('/questions')
    .get(getQuestions)
    .post(addNewQuestion);
    
    app.route('/question/:questionId')
    .get(getQuestionById)
    .put(updateQuestion)
    .delete(deleteQuestion);

    app.route('/questions/categories')
      .get(getQuestionsWithCategoryName);
  }

export default questionRoutes;
