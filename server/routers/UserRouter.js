import express from "express";
import {getUsers,existUser, createUser} from '../controllers/UserController.js';
const router = express.Router();

router.use('/create',existUser);
router.post('/create',createUser);

router.get('/',getUsers); 

export default router;