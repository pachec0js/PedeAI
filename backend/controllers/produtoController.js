import { db } from '../config/db.js';

export const listarProdutos = async (req, res) => {
    const [rows] = await db.query('SELECT * FROM produtos');
    res.json(rows);
};

export const criarProduto = async (req, res) => {
    const { nome, preco, estoque, categoria } = req.body;
    await db.query('INSERT INTO produtos (nome, preco, estoque, categoria) VALUES (?, ?, ?, ?)',
        [nome, preco, estoque, categoria]);
    res.json({ message: 'Produto criado' });
};

export const atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const { nome, preco, estoque, categoria } = req.body;
    await db.query('UPDATE produtos SET nome=?, preco=?, estoque=?, categoria=? WHERE id=?',
        [nome, preco, estoque, categoria, id]);
    res.json({ message: 'Produto atualizado' });
};

export const deletarProduto = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM produtos WHERE id=?', [id]);
    res.json({ message: 'Produto deletado' });
};
