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
