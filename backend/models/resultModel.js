import mongoose from "mongoose";

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const ResultSchema = new Schema({
  result: {
    type: Number,
    required: true
  },
  answers: [{
    questionId: String,
    answerNumber: Number,
    correct: Boolean
  }],
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  quizId: {
    type: ObjectId,
    ref: 'Quiz',
    required: true
  }
}, {timestamps:true})

const ResultModel = mongoose.model('Result', ResultSchema);

export default ResultModel;
