import mongoose from 'mongoose';
const {Schema}  = mongoose;
const PostSchema = new Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        author:{
            type: mongoose.Schema.Types.ObjectId, ref:'Users'
        },
        categories:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Categories'
        },
        status : {
            type:String,
            default:'Pending Approval'
        },
        comment:[{
            userID:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Users'
            },
            contentComment: {
                type:String,
                required:true
            }
        },{timestamps:true}]
    },
    {timestamps:true}
);
export const PostModel = mongoose.model('Posts',PostSchema);