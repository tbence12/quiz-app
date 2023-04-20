import UserModel from '../models/userModel';

export const addNewUser = (req, res) => {
  let newUser = new UserModel(req.body);

  newUser.save()
    .then( savedUser => res.json(savedUser));
}

export const getUsers = async (req, res) => {
  const users = await UserModel.find({});
  res.json(users);
}

export const getUserById = async (req, res) => {
  const user = await UserModel.findById(req.params.userId);
  res.json(user);
}

export const updateUser = async (req, res) => {
  const updatedUser = await UserModel.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true});
  res.json(updatedUser);
}

export const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  await UserModel.deleteOne({_id: userId});
  res.json({ message: `Successfully deleted user with id: ${userId}.`});
}
