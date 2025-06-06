import express from 'express';
import verifyToken from '../middlewares/auth.js';
import {
  listarRecompensas,
  criarRecompensa,
  atualizarRecompensa,
  deletarRecompensa,
} from '../controllers/recompensaController.js';

const router = express.Router();

router.get('/', verifyToken, listarRecompensas);
router.post('/', verifyToken, criarRecompensa);
router.put('/:id', verifyToken, atualizarRecompensa);
router.delete('/:id', verifyToken, deletarRecompensa);

export default router;
