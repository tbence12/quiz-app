import CategoryModel from '../models/categoryModel';

export const addNewCategory = (req, res) => {
  let newCategory = new CategoryModel(req.body);
  
    newCategory.save()
      .then( savedCategory => res.json(savedCategory))
      .catch( error => res.status(500).json({message: error.message}));
}

export const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.categoryId);
    res.json(category);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await CategoryModel.findOneAndUpdate({_id: req.params.categoryId}, req.body, {new: true});
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    await CategoryModel.deleteOne({_id: categoryId});
    res.json({ message: `Successfully deleted category with id: ${categoryId}.`});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}
