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
    await db.query(
        `INSERT INTO produtos (nome, nome_cardapio, sabor, preco, estoque, categoria, descricao)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nome, nome_cardapio, sabor, preco, estoque, categoria, descricao]
    );
    res.json({ message: 'Produto cadastrado com sucesso.' });
};

export const atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const { nome, nome_cardapio, sabor, preco, estoque, categoria, descricao } = req.body;
    await db.query(
        `UPDATE produtos 
         SET nome = ?, nome_cardapio = ?, sabor = ?, preco = ?, estoque = ?, categoria = ?, descricao = ?
         WHERE id = ?`,
        [nome, nome_cardapio, sabor, preco, estoque, categoria, descricao, id]
    );
    res.json({ message: 'Produto atualizado com sucesso.' });
};

export const deletarProduto = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM produtos WHERE id = ?', [id]);
    res.json({ message: 'Produto deletado com sucesso.' });
};
