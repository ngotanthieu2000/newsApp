import mongoose from "mongoose";
const {Schema}  = mongoose;
const RoleSchema = Schema(
    {
        roleName:{
            type:String,
            require:true
        }
    },
    {timestamps:true}
);

export const RoleModel = mongoose.model('Roles',RoleSchema);