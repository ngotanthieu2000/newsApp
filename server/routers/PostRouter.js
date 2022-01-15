import express from "express";
import {getPosts,createPost,updatePost, deletePost, searchByCategories} from '../controllers/PostController.js';
import { getCategories } from "../controllers/CategoriesController.js";
const router = express.Router();

router.get('/',getPosts); 
router.use('/search/categories',getCategories,searchByCategories);
router.post('/create',createPost);
router.post('/update',updatePost);
router.use('/delete',deletePost);

export default router;