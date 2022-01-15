import {CategoriesModel} from "../models/CategoriesModel.js";

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

export const getCategories = async (req,res,next) =>{
    try {
        const categoriesName = req.body.categoriesName;
        const categories = await CategoriesModel.findOne({categoriesName:categoriesName}).exec();
        if(categories){
            // console.log(categories);
            req.body._id = categories._id;
            next();
        }
        else{
           return res.status(404).json({error:"Not found categories!"});
        }
    } catch (error) {
        return res.status(500).json({error:error});
    }
}