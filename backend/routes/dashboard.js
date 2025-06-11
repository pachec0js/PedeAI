import express from 'express';
import { getDashboardData } from '../controllers/dashboardController.js';
import verifyToken from '../middlewares/auth.js';
import onlyAdmin from '../middlewares/onlyAdmin.js';

const router = express.Router();

router.get('/', verifyToken, onlyAdmin, getDashboardData);

export default router;