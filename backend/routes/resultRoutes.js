import { getResults, addNewResult, getResultById, deleteResult } from "../controllers/resultController";

const resultRoutes = (app) => {
  app.route('/results')
    .get(getResults)
    .post(addNewResult);
  
  app.route('/result/:resultId')
    .get(getResultById)
    .delete(deleteResult);
}

export default resultRoutes;
