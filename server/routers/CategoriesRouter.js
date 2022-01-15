import express from "express";
import { createCategories } from "../controllers/CategoriesController.js";

const router = express.Router();
router.post('/create',createCategories);
export default router;