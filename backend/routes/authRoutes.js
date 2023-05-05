import { loginUser, logoutUser, userStatus } from "../controllers/authController";

const authRoutes = (app) => {
  app.route('/login')
    .post(loginUser);

  app.route('/logout')
    .post(logoutUser);

  app.route('/status')
    .get(userStatus);
}

export default authRoutes;
