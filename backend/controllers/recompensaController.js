import { db } from '../config/db.js';

export const listarRecompensas = async (req, res) => {
    const [rows] = await db.query('SELECT * FROM recompensas');
    res.json(rows);
};

export const criarRecompensa = async (req, res) => {
    const { nome, descricao, pontos_necessarios } = req.body;
    await db.query(
        'INSERT INTO recompensas (nome, descricao, pontos_necessarios) VALUES (?, ?, ?)',
        [nome, descricao, pontos_necessarios]
    );
    res.json({ message: 'Recompensa criada' });
};

export const atualizarRecompensa = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, pontos_necessarios } = req.body;
    await db.query(
        'UPDATE recompensas SET nome=?, descricao=?, pontos_necessarios=? WHERE id=?',
        [nome, descricao, pontos_necessarios, id]
    );
    res.json({ message: 'Recompensa atualizada' });
};

export const deletarRecompensa = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM recompensas WHERE id=?', [id]);
    res.json({ message: 'Recompensa deletada' });
};
