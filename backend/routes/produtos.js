import express from 'express';
import verifyToken from '../middlewares/auth.js';
import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  deletarProduto,
} from '../controllers/produtoController.js';

const router = express.Router();

router.get('/', verifyToken, listarProdutos);
router.post('/', verifyToken, criarProduto);
router.put('/:id', verifyToken, atualizarProduto);
router.delete('/:id', verifyToken, deletarProduto);

export default router;
