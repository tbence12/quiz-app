import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
}, {timestamps:true})

const CategoryModel = mongoose.model('Category', CategorySchema);

export default CategoryModel;
