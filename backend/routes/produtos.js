import express from 'express';
import { db } from '../config/db.js';
import verifyToken from '../middlewares/auth.js';
import onlyAdmin from '../middlewares/onlyAdmin.js';
import {
  listarProdutos,
  listarProdutoPorId,
  listarSabores,
  criarProduto,
  atualizarProduto,
  deletarProduto,
  listarProdutosAdmin
} from '../controllers/produtoController.js';

const router = express.Router();

router.get('/', listarProdutos);

router.get('/buscar', async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: 'Termo de busca não fornecido.' });
  }

  const searchTerm = `%${q}%`;

  const queryProdutos = `
    SELECT 
      MIN(p_main.id) as id,
      nome_cardapio,
      categoria,
      MIN(preco) as preco,
      MIN(estoque > 0) as disponivel,
      MAX(
        CASE
          WHEN nome_cardapio LIKE ? THEN 10
          WHEN nome LIKE ? THEN 8
          WHEN sabor LIKE ? THEN 5
          WHEN categoria LIKE ? THEN 3
          WHEN descricao LIKE ? THEN 1
          ELSE 0
        END
      ) as relevance
    FROM 
      produtos as p_main
    WHERE 
      p_main.nome LIKE ? 
      OR p_main.nome_cardapio LIKE ? 
      OR p_main.categoria LIKE ? 
      OR p_main.sabor LIKE ?
      OR p_main.descricao LIKE ?
    GROUP BY 
      p_main.nome_cardapio, p_main.categoria
    HAVING
      relevance > 0
    ORDER BY 
      relevance DESC,
      p_main.nome_cardapio;
  `;

  const queryCombos = `
    SELECT 
      id, nome, descricao, pontos_necessarios
    FROM 
      recompensas
    WHERE 
      nome LIKE ? OR descricao LIKE ?
    ORDER BY
      pontos_necessarios;
  `;

  try {
    const paramsProdutos = [
      searchTerm, searchTerm, searchTerm, searchTerm, searchTerm,
      searchTerm, searchTerm, searchTerm, searchTerm, searchTerm
    ];
    const paramsCombos = [searchTerm, searchTerm];

    const [produtosResults] = await db.query(queryProdutos, paramsProdutos);
    const [combosResults] = await db.query(queryCombos, paramsCombos);

    res.json({
      produtos: produtosResults,
      combos: combosResults
    });
    
  } catch (error) {
    console.error("Erro na busca geral:", error);
    res.status(500).json({ message: 'Erro interno do servidor ao realizar a busca.' });
  }
});

router.get('/admin', verifyToken, onlyAdmin, listarProdutosAdmin);

router.get('/:id', listarProdutoPorId);
router.get('/sabores/:nome_cardapio', listarSabores);

router.post('/', verifyToken, onlyAdmin, criarProduto);
router.put('/:id', verifyToken, onlyAdmin, atualizarProduto);
router.delete('/:id', verifyToken, onlyAdmin, deletarProduto);

export default router;