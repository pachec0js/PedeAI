import express from 'express';
import { listarAlunosComPontos } from '../controllers/alunoController.js';
import verifyToken from '../middlewares/auth.js';
import onlyAdmin from '../middlewares/onlyAdmin.js';

const router = express.Router();

router.get('/', verifyToken, onlyAdmin, listarAlunosComPontos);

export default router;