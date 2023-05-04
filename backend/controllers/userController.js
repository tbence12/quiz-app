import UserModel from '../models/userModel';

export const addNewUser = (req, res) => {
  let newUser = new UserModel(req.body);

  newUser.save()
    .then( savedUser => res.json(savedUser))
    .catch( error => res.status(500).json({message: error.message}));
}

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true});
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await UserModel.deleteOne({_id: userId});
    res.json({ message: `Successfully deleted user with id: ${userId}.`});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}
