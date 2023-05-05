import userRoutes from './userRoutes';
import categoryRoutes from './categoryRoutes';
import questionRoutes from './questionRoutes';
import quizRoutes from './quizRoutes';
import resultRoutes from './resultRoutes';
import authRoutes from './authRoutes';

const routes = (app) => {
  userRoutes(app);
  categoryRoutes(app);
  questionRoutes(app);
  quizRoutes(app);
  resultRoutes(app);
  authRoutes(app);
}

export default routes;
