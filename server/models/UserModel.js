import mongoose from 'mongoose';
const {Schema} = mongoose;
const UserSchema = new Schema(
    {
        userName:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            default:""
        },
        fullName:{
            type:String,
            required:true,
        },
        phone:{
            type:String,
            required:true,
            unique:true
        },
        passWord:{
            type:String,
            required:true
        },
        avatar:{
            type:String,
        },
        role:{
            type:String,
            default:"Author"
        },
        refreshToken:{
            type:String,
            default:""
        }
    },
    {timestamps:true}
);
export const UserModel = mongoose.model('Users',UserSchema);