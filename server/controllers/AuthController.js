import agron2 from 'argon2';  
import jwt from 'jsonwebtoken';
import dov from 'dotenv';
dov.config();
import { UserModel } from "../models/UserModel.js";

const generateToken = (payload) =>{
    const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_LIFE});
    const refreshToken = jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET); 

    return {accessToken, refreshToken};
}

export const validToken =async (req,res,next)=>{
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' '[1]);
    // console.log("Token:",token);

    if(!token) return res.status(401).json({Message:"You may not have access"})

    try {
        // console.log("Start decode");
        const decode = jwt.verify(token.toString(),process.env.ACCESS_TOKEN_SECRET)
        // console.log("Decode:",decode);
        const user = await UserModel.findById({_id:decode.userId});
        if(user.refreshToken === "") return res.status(401).json({Success:false, Message:"Please login to your account"})
        req.user = user;
        // req.userId = decode.userId;
        // req.fullName = decode.fullName;
        // req.role = decode.role;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({Message:"Error, please try again",Error:error});        
    }
}

export const authRegister = async (req, res) =>{
    try {
        req.body.userName = req.body.userName.toLowerCase();
        const {userName,passWord ,phone} = req.body;
        console.log("username:",userName);
        const userExist = await UserModel.findOne({ userName: userName }).exec();
        const phoneExist = await UserModel.findOne({ phone: phone }).exec();
        if(phoneExist) return res.status(403).json({Success:false, Message:"Your number phone has been exist"});
        else if (!userExist && !phoneExist){
            const hashPassWord = await agron2.hash(passWord);
            req.body.passWord = hashPassWord;
            const user = new UserModel(req.body);
            await user.save();
        
            // return token
            const token = generateToken({user});
            //add refreshToken in database

            const addRefreshToken =  await UserModel.findOneAndUpdate({_id:user._id},{refreshToken:token.refreshToken});
            await addRefreshToken.save();
            res.status(200).json({Success:true,Message:"Register successfully",token});
        }
        else{
            res.status(403).json({Success:false, Message:"User already exist"});
        }
    } catch (error) {
        res.status(500).json({Success:false, Error:error});
    }
}

export const authLogin = async (req,res) =>{
    try {
        req.body.userName = req.body.userName.toLowerCase();
        const {userName,passWord} = req.body;
        // console.log("Username and Password:",req.body);
        if(!userName || !passWord){
            res.status(400).json({Success:false, Message:"Enter your Username and Password"});
        }
        else{
            const user = await UserModel.findOne({userName});
            if(!user){
                res.status(400).json({Success:false, Message:"Username or Password incorrect"})
            }else{
                // console.log("Username hop le!");
                const passwordValid = await agron2.verify(user.passWord, passWord);
                if(!passwordValid){
                    res.status(400).json({Success:false, Message:"Username or Password incorrect"})
                }
                else{
                    // console.log("Password hop le!");
                    // return token
                    
                    const token = generateToken({userId:user._id, fullName:user.fullName , role:user.role});
                    const addRefreshToken =  await UserModel.findOneAndUpdate({_id:user._id},{refreshToken:token.refreshToken});
                    await addRefreshToken.save();
                    res.status(200).json({Success:true,Message:"Login successfully",token});
                }
            }
        }
    } catch (error) {
        res.status(500).json({Success:false, Error:error ,Message:"Error occurred, please try again"});
    }
}

export const authLogout =async (req,res) =>{
    try {
        const updateRefreshToken = await UserModel.findOneAndUpdate({_id:req.userId},{refreshToken:""},{new:true});
        await updateRefreshToken.save();
        if(updateRefreshToken) return res.status(200).json({Success:true, Message:"Logout successfully"});
        return res.status(400).json({Success:false,Message:"User not found"});
    } catch (error) {
        res.status(500).json({Success:false,Message:"Error, please try again!", Error:error});
    }
}

export const token = async (req,res) =>{
    const refreshToken = req.body.refreshToken;
    // console.log("RefreshToken:",refreshToken);
    if(!refreshToken) return res.status(401).json({Success:false, Message:"Not found refresh token"});

    const user = await UserModel.findOne({refreshToken});
    if(!user) return res.status(403).json({Success:false, Message:"Not found user"});
    try {
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);

        const token = generateToken({user});
        res.status(200).json({Success:true, Message:"Refresh Token successfully" ,Token:token});
    } catch (error) {
        res.status(500).json({Success:false,Message:"Error, please try again!", Error:error});
    }
}