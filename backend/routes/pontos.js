import express from 'express';
import verifyToken from '../middlewares/auth.js';
import {
  consultarPontos,
  atualizarPontos,
} from '../controllers/pontoController.js';

const router = express.Router();

router.get('/:ra', verifyToken, consultarPontos);
router.put('/:ra', verifyToken, atualizarPontos);

export default router;
