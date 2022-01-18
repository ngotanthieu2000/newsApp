import e from "express";
import { PostModel } from "../models/PostModel.js";

export const getPosts = async (req,res) => {
   try {
        const posts = await PostModel.find();
        console.log('post',posts);
        res.status(200).json(posts);
   } catch (error) {
       res.status(500).json({error:error});
   }
}

export const createPost = async (req,res) =>{
    try {
        const newPost = req.body;
        const post = new PostModel(newPost);
        await post.save();

        res.status(200).json(post);
    } catch (error) {
       res.status(500).json({error:error});
    }
};

export const updatePost = async (req,res) =>{
    try {
        const updatePost = req.body;
        // console.log("Post Update :" ,updatePost);
        const post = await PostModel.findOneAndUpdate({
            _id :updatePost._id},updatePost,{new :true});
        await post.save();

        res.status(200).json(post);
    } catch (error) {
       res.status(500).json({error:error});
    }
};

// delete posy by postID
export const deletePost =async (req,res)=>{
    try {
        const deletePost = await PostModel.findByIdAndDelete({ _id: req.params.id}).exec();
        if(deletePost){
            res.status(200).json({Success:"Post delete successfuly"});
        }
        else{
            res.status(404 ).json({Error:"Post not found"});
        }
    } catch (error) {
        res.status(500).json({error});
    }
    
}

export const searchByCategories =async (req,res) =>{
    try {
        console.log('ID = ',req.body._id);
        const posts = await PostModel.find({categories:req.body._id}).exec();
        console.log('post',posts);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(({Success:false, Message:"Error, please try again", Error:error}));
    }
}

export const searchByTitle = async (req, res) =>{
    const searchStr = req.query.searchStr;
    console.log("Search String:",searchStr);
    if(!searchStr) return getPosts(res,res);

    try {
        const posts = await PostModel.find({title:{$regex:searchStr}});
        console.log(posts);
        if(Object.keys(posts).length === 0 ) return res.status(404).json({Success:false , Message:"Not found"});
        res.status(200).json({Success:true, Message:"That's Oke", Posts:posts});
    } catch (error) {
        res.status(500).json(({Success:false, Message:"Error, please try again", Error:error}));
    }
}