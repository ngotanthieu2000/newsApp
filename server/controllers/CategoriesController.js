import {CategoriesModel} from "../models/CategoriesModel.js";
import { PostModel } from "../models/PostModel.js";
export const createCategories = async (req,res) =>{
    try {
        const data = req.body;
        const categories = new CategoriesModel(data);
        await categories.save();

        res.status(200).json(categories);
    } catch (error) {
        res.status(500),json({error:error});
    }
}

export const getCategories = async (req,res) =>{
    try {
  
        const categories = await CategoriesModel.find();
        if(categories){
            res.status(200).json({Categories:categories});
        }
        else{
            res.status(404).json({error:"Not found categories!"});
        }
    } catch (error) {
         res.status(500).json({error:error});
    }
}

export const deleteCategories = async (req,res) =>{
    try {
        const deleteCategories = await CategoriesModel.findByIdAndDelete({_id:req.params.id});
        if(deleteCategories){
            await PostModel.updateMany({categories:req.params.id}, {$set:{status:"Hiden"}});
            res.status(200).json({Success:"Categories delete successfuly"});
        }
        else{
            res.status(404 ).json({Error:"Categories not found"});
        }
    } catch (error) {
        res.status(500).json({error});
    }
}