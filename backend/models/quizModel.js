import mongoose from "mongoose";

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const QuizSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  questionIds: [{
    type: ObjectId,
    ref: 'Category'
  }]
}, {timestamps:true})

const QuizModel = mongoose.model('Quiz', QuizSchema);

export default QuizModel;
