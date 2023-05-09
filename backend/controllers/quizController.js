import mongoose from "mongoose";
import QuizModel from '../models/quizModel';
import ResultModel from '../models/resultModel';

export const addNewQuiz = (req, res) => {
  let newQuiz = new QuizModel(req.body);

  newQuiz.save()
    .then( savedQuiz => res.json(savedQuiz))
    .catch( error => res.status(500).json({message: error.message}));
}

export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await QuizModel.find({});
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const getQuizById = async (req, res) => {
  try {
    const quiz = await QuizModel.findById(req.params.quizId);
    res.json(quiz);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const updateQuiz = async (req, res) => {
  try {
    const updatedQuiz = await QuizModel.findOneAndUpdate({_id: req.params.quizId}, req.body, {new: true});
    res.json(updatedQuiz);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    await QuizModel.findOneAndUpdate({_id: quizId}, {isDeleted: true});
    res.json({ message: `Successfully deleted quiz with id: ${quizId}.`});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const getUnfilledQuizzes = async (req, res) => {
  try {
    const userId = req.params.userId;

    const results = await ResultModel.find({ userId: userId });
    const quizIds = results.map(result => result.quizId);
    const quizzes = await QuizModel.find({ _id: { $nin: quizIds }, isDeleted: false });
    
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const getQuizWithQuestions = async (req, res) => {
  try {
    const userId = req.params.userId;
    const quizId = req.params.quizId;
    
    const results = await ResultModel.find({ userId: userId });
    const quizIds = results.map(result => result.quizId);

    if(quizIds.toString().includes(quizId)) {
      res.json([]);
    } else {
      const quizObjectId = new mongoose.Types.ObjectId(quizId);
      const quizzes = await QuizModel.aggregate([
        { $match:{_id: quizObjectId, isDeleted: false} },
        {
          $lookup: {
            from: "questions",
            localField: "questionIds",
            foreignField: "_id",
            as: "questions"
          }
        },
      ]).exec();
    
      res.json(quizzes);
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}
