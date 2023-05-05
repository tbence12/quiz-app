import mongoose from "mongoose";

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const QuestionSchema = new Schema({
  text: {
    type: String,
    unique: true,
    required: true
  },
  answers: [{
    number: Number,
    text: String,
    correct: Boolean
  }],
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  categoryIds: [{
    type: ObjectId,
    ref: 'Category'
  }]
}, {timestamps:true})

const QuestionModel = mongoose.model('Question', QuestionSchema);

export default QuestionModel;
