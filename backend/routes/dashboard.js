import express from 'express';
import verifyToken from '../middlewares/auth.js';
import { obterDashboard } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/', verifyToken, obterDashboard);

export default router;
