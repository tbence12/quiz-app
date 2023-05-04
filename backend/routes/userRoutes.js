import { addNewUser, getUsers, getUserById, updateUser, deleteUser } from "../controllers/userController";

const userRoutes = (app) => {
  app.route('/users')
    .get(getUsers)
    .post(addNewUser);
  
  app.route('/user/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
}

export default userRoutes;
