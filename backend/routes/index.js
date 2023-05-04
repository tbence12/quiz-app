import userRoutes from './userRoutes';
import categoryRoutes from './categoryRoutes';
import questionRoutes from './questionRoutes';
import quizRoutes from './quizRoutes';
import resultRoutes from './resultRoutes';

const routes = (app) => {
  userRoutes(app);
  categoryRoutes(app);
  questionRoutes(app);
  quizRoutes(app);
  resultRoutes(app);
}

export default routes;
