import { db } from '../config/db.js';

export const listarProdutos = async (req, res) => {
    const [rows] = await db.query(`
        SELECT 
            MIN(id) AS id,
            nome_cardapio,
            categoria,
            MIN(preco) AS preco
        FROM produtos
        GROUP BY nome_cardapio, categoria
    `);
    res.json(rows);
};

export const listarProdutosAdmin = async (req, res) => {
  try {
    const [produtos] = await db.query("SELECT * FROM produtos ORDER BY categoria, nome_cardapio, nome");
    res.json(produtos);
  } catch (error) {
    console.error("Erro ao listar produtos para admin:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export const listarProdutoPorId = async (req, res) => {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
    if (rows.length === 0) {
        return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(rows[0]);
};

export const listarSabores = async (req, res) => {
    const { nome_cardapio } = req.params;
    const [rows] = await db.query(
        'SELECT * FROM produtos WHERE nome_cardapio = ?',
        [nome_cardapio]
    );
    if (rows.length === 0) {
        return res.status(404).json({ message: 'Nenhum sabor encontrado.' });
    }
    res.json(rows);
};

export const criarProduto = async (req, res) => {
  const { nome, nome_cardapio, sabor, preco, estoque, categoria, descricao } = req.body;
  if (!nome || !nome_cardapio || !preco || !categoria) {
    return res.status(400).json({ message: "Campos obrigatórios não preenchidos." });
  }
  try {
    const [result] = await db.query(
      "INSERT INTO produtos (nome, nome_cardapio, sabor, preco, estoque, categoria, descricao) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nome, nome_cardapio, sabor || '', preco, estoque || 0, categoria, descricao || '']
    );
    res.status(201).json({ id: result.insertId, message: "Produto criado com sucesso." });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, nome_cardapio, sabor, preco, estoque, categoria, descricao } = req.body;
  if (!nome || !nome_cardapio || !preco || !categoria) {
    return res.status(400).json({ message: "Campos obrigatórios não preenchidos." });
  }
  try {
    await db.query(
      "UPDATE produtos SET nome = ?, nome_cardapio = ?, sabor = ?, preco = ?, estoque = ?, categoria = ?, descricao = ? WHERE id = ?",
      [nome, nome_cardapio, sabor, preco, estoque, categoria, descricao, id]
    );
    res.status(200).json({ message: "Produto atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export const deletarProduto = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM produtos WHERE id = ?", [id]);
    res.status(200).json({ message: "Produto deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};