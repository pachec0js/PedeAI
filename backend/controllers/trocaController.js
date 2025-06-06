import { db } from '../config/db.js';

export const realizarTroca = async (req, res) => {
    const user = req.user;
    const { id_recompensa } = req.body;

    const [rec] = await db.query('SELECT * FROM recompensas WHERE id=?', [id_recompensa]);
    if (rec.length === 0) {
        return res.status(404).json({ message: 'Recompensa não encontrada' });
    }

    const recompensa = rec[0];

    const [pontosData] = await db.query('SELECT * FROM pontos WHERE ra_aluno=?', [user.ra]);
    const pontosAtual = pontosData.length > 0 ? pontosData[0].pontos : 0;

    if (pontosAtual < recompensa.pontos_necessarios) {
        return res.status(400).json({ message: 'Pontos insuficientes' });
    }

    await db.query(
        'INSERT INTO trocas (ra_aluno, id_recompensa, pontos_gastos) VALUES (?, ?, ?)',
        [user.ra, id_recompensa, recompensa.pontos_necessarios]
    );

    await db.query(
        'UPDATE pontos SET pontos = pontos - ? WHERE ra_aluno = ?',
        [recompensa.pontos_necessarios, user.ra]
    );

    res.json({ message: 'Troca realizada com sucesso' });
};

export const listarTrocas = async (req, res) => {
    const user = req.user;
    let rows;

    if (user.tipo === 'adm') {
        [rows] = await db.query(
            `SELECT t.*, r.nome as nome_recompensa 
             FROM trocas t 
             JOIN recompensas r ON t.id_recompensa = r.id`
        );
    } else {
        [rows] = await db.query(
            `SELECT t.*, r.nome as nome_recompensa 
             FROM trocas t 
             JOIN recompensas r ON t.id_recompensa = r.id 
             WHERE t.ra_aluno = ?`, [user.ra]
        );
    }

    res.json(rows);
};

export const cancelarTroca = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM trocas WHERE id=?', [id]);
    res.json({ message: 'Troca cancelada' });
};
