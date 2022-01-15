import express from 'express';
import { createRole } from '../controllers/RoleController.js';

const router = express.Router();
router.post('/create',createRole);

export default router;