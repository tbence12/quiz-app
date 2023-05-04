import { addNewCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categoryController";

const categoryRoutes = (app) => {
  app.route('/categories')
    .get(getCategories)
    .post(addNewCategory);
  
  app.route('/category/:categoryId')
    .get(getCategoryById)
    .put(updateCategory)
    .delete(deleteCategory);
}

export default categoryRoutes;
