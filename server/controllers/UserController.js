import { UserModel } from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500), json({ error: error });
  }
};
// check user already exist 
export const existUser = async (req, res, next) => {
  const { userName, email } = req.body;
  const userExist = await UserModel.findOne({ userName: userName }).exec();
  const emailExist = await UserModel.findOne({ email: email }).exec();
  if (userExist === null && emailExist === null) {
    return next();
  } else {
    res.send(`User already exist`);
  }
};

export const createUser = async (req, res) => {
  try {
    const data = req.body;
    const user = new UserModel(data);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
