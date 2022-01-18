import express from "express";
import { createCategories, deleteCategories, getCategories } from "../controllers/CategoriesController.js";

const router = express.Router();
router.get('/',getCategories);
router.post('/create',createCategories);
router.delete('/delete/:id', deleteCategories);

export default router;