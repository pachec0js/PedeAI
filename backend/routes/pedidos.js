import express from 'express';
import verifyToken from '../middlewares/auth.js';
import {
  criarPedido,
  listarPedidos,
  atualizarStatusPedido,
} from '../controllers/pedidoController.js';

const router = express.Router();

router.post('/', verifyToken, criarPedido);
router.get('/', verifyToken, listarPedidos);
router.put('/:id', verifyToken, atualizarStatusPedido);

export default router;
