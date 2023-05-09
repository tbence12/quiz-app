import QuestionModel from '../models/questionModel';

export const addNewQuestion = (req, res) => {
  let newQuestion = new QuestionModel(req.body);

  newQuestion.save()
    .then( savedQuestion => res.json(savedQuestion))
    .catch( error => res.status(500).json({message: error.message}));
}

export const getQuestions = async (req, res) => {
  try {
    const questions = await QuestionModel.find({});
    res.json(questions);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const getQuestionById = async (req, res) => {
  try {
    const question = await QuestionModel.findById(req.params.questionId);
    res.json(question);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await QuestionModel.findOneAndUpdate({_id: req.params.questionId}, req.body, {new: true});
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    await QuestionModel.deleteOne({_id: questionId});
    res.json({ message: `Successfully deleted question with id: ${questionId}.`});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const getQuestionsWithCategoryName = async (req, res) => {
  try {
    const questions = await QuestionModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryIds",
          foreignField: "_id",
          as: "categories"
        }
      },
    ]).exec();
  
    res.json(questions);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}
