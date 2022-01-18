import express from "express";
import {getPosts,createPost,updatePost, deletePost, searchByCategories, searchByTitle} from '../controllers/PostController.js';
import { getCategories } from "../controllers/CategoriesController.js";
const router = express.Router();

router.get('/',getPosts); 
router.get('/search',searchByTitle);
router.use('/search/categories',getCategories,searchByCategories);
router.post('/create',createPost);
router.put('/update',updatePost);
router.delete('/delete/:id',deletePost);

export default router;