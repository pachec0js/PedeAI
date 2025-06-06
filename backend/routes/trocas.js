import express from 'express';
import verifyToken from '../middlewares/auth.js';
import {
  realizarTroca,
  listarTrocas,
  cancelarTroca,
} from '../controllers/trocaController.js';

const router = express.Router();

router.post('/', verifyToken, realizarTroca);
router.get('/', verifyToken, listarTrocas);
router.delete('/:id', verifyToken, cancelarTroca);

export default router;
