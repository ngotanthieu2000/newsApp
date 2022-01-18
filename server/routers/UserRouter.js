import express from "express";
import {getUsers,updateUser} from '../controllers/UserController.js';
import { authLogin, authLogout, authRegister, token, validToken } from "../controllers/AuthController.js";
const router = express.Router();

router.get('/',validToken,getUsers); 
router.post('/register',authRegister);
router.post('/login',authLogin);
router.delete('/logout',validToken,authLogout);
router.use('/token',token);
router.put('/update',validToken,updateUser);

export default router;