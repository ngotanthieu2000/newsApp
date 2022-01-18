import { UserModel } from "../models/UserModel.js";
import jwt from 'jsonwebtoken';
import dov from 'dotenv';
dov.config();
export const getUsers = async (req, res) => {
  try {
    const user = await UserModel.find({_id:req.userId});
    res.status(200).json({Success:true, Message:"Get infomation user successfully" , User:user});
  } catch (error) {
    res.status(500), json({ Success:false, Message:"Error, please try again", Error:error });
  }
};
// check user already exist 
export const existUser = async (req, res, next) => {
  const { userName, email } = req.body;
  const userExist = await UserModel.findOne({ userName: userName }).exec();
  const emailExist = await UserModel.findOne({ email: email }).exec();
  if (userExist === null && emailExist === null) {
    next();
  } else {
    res.send(`User already exist`); 
  }
};
// tao moi mot user
export const createUser = async (req, res) => {
  try {
    const data = req.body;
    const user = new UserModel(data);
    await user.save();

    // return token
    const accessToken = jwt.sign({userId:user._id},process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({Success:true,Message:"Register successfully",accessToken});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
// cap nhat thong tin user
export const updateUser = async (req,res) =>{
  try {
    const userUpdate = await UserModel.findOneAndUpdate({_id:req.userId},req.body,{new:true}); 
    if(userUpdate){
      userUpdate.save();
      res.status(200).json({Success:userUpdate});
    }
    else {
      res.status(400).json({Failure:"Error! Can't update user."});
    }
  } catch (error) {
    res.status(500).json({error});
  }
}
