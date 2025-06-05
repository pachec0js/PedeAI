import express from 'express';
import verifyToken from '../middlewares/auth.js';
import onlyAdmin from '../middlewares/onlyAdmin.js';

import {
  listarProdutos,
  listarProdutoPorId,
  listarSabores,
  criarProduto,
  atualizarProduto,
  deletarProduto,
} from '../controllers/produtoController.js';

const router = express.Router();

// Listagem de produtos únicos por nome_cardapio + categoria
router.get('/', listarProdutos);

//  Detalhes de um produto específico
router.get('/:id', listarProdutoPorId);

//  Listagem de sabores de um produto
router.get('/sabores/:nome_cardapio', listarSabores);

router.post('/', verifyToken, onlyAdmin, criarProduto);
router.put('/:id', verifyToken, onlyAdmin, atualizarProduto);
router.delete('/:id', verifyToken, onlyAdmin, deletarProduto);

export default router;
