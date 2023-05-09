import mongoose from "mongoose";
import ResultModel from '../models/resultModel';

export const addNewResult = (req, res) => {
  let newResult = new ResultModel(req.body);

  newResult.save()
    .then( savedResult => res.json(savedResult))
    .catch( error => res.status(500).json({message: error.message}));
}

export const getResults = async (req, res) => {
  try {
    const results = await ResultModel.find({});
    res.json(results);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const getResultById = async (req, res) => {
  try {
    const result = await ResultModel.findById(req.params.resultId);
    res.json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const deleteResult = async (req, res) => {
  try {
    const resultId = req.params.resultId;
    await ResultModel.deleteOne({_id: resultId});
    res.json({ message: `Successfully deleted result with id: ${resultId}.`});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const getUserResults = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const results = await ResultModel.aggregate([
      { $match:{userId: userObjectId} },
      {
        $lookup: {
          from: "quizzes",
          localField: "quizId",
          foreignField: "_id",
          as: "quiz",
        },
      },
      { $unwind: "$quiz" },
      {
        $project: {
          _id: 1, 
          userId:1,
          quizId: 1,
          quizName: "$quiz.name", 
          result: 1,
        },
      },
    ]).exec();
    res.json(results);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const getUsersResults = async (req, res) => {
  try {
    const results = await ResultModel.aggregate([
      {
        $group: {
          _id: "$userId",
          scores: { $sum: "$result" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $sort: { scores: -1 }
      },
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          username: "$user.username",
          year: "$user.year",
          scores: 1
        }
      }
    ]).exec();
    res.json(results);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}
