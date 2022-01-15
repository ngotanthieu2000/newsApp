import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import route from "./routers/index.js";

// const URI = 'mongodb+srv://admin:9Xj8SBfgz7kUZXsP@cluster0.xwu1z.mongodb.net/News?retryWrites=true&w=majority';
const URI = 'mongodb://localhost:27017/news';
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({extended: true , limit:'30mb'}));
app.use(cors());
app.use(express.json());
route(app);

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=>{
        console.log("connect db success...");
        app.listen(PORT, ()=>{
            console.log(`Server is running on port = ${PORT}... `);
        })
    }).catch((err)=>{
        console.log(err);
    })

