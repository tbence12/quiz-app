import QuizModel from '../models/quizModel';

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
    await QuizModel.deleteOne({_id: quizId});
    res.json({ message: `Successfully deleted quiz with id: ${quizId}.`});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}
