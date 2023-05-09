import { getResults, addNewResult, getResultById, deleteResult, getUserResults, getUsersResults } from "../controllers/resultController";

const resultRoutes = (app) => {
  app.route('/results')
    .get(getResults)
    .post(addNewResult);
    
    app.route('/result/:resultId')
    .get(getResultById)
    .delete(deleteResult);

    app.route('/results/:userId')
      .get(getUserResults);

    app.route('/users/results')
      .get(getUsersResults);
  }

export default resultRoutes;
