import express from 'express';
import verifyToken from '../middlewares/auth.js';
import onlyAdmin from '../middlewares/onlyAdmin.js';
import {
  criarPedido,
  listarPedidos,
  atualizarStatusPedido,
  deletarPedido,
  cancelarPedidoAluno
} from '../controllers/pedidoController.js';

const router = express.Router();

router.post('/', verifyToken, criarPedido);
router.get('/', verifyToken, listarPedidos);

router.put('/:id', verifyToken, onlyAdmin, atualizarStatusPedido);
router.delete('/:id', verifyToken, onlyAdmin, deletarPedido);
router.patch('/:id/cancelar', verifyToken, cancelarPedidoAluno);

export default router;