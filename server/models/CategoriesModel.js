import mongoose from "mongoose";
const {Schema} = mongoose;
const CategoriesSchema = new Schema(
    {
        categoriesName:{
            type:String,
            required:true
        }
    },
    {timestamps:true}
);
export const CategoriesModel = mongoose.model('Categories',CategoriesSchema);
