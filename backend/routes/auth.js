import express from 'express';
import { loginAdm, loginAluno } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginAdm);
router.post('/login-aluno', loginAluno);

export default router;
