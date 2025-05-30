import { db } from '../config/db.js';

export const criarPedido = async (req, res) => {
    const { itens } = req.body;
    const user = req.user;

    if (user.tipo !== 'aluno') {
        return res.status(403).json({ message: 'Apenas alunos podem fazer pedidos' });
    }

    const [result] = await db.query(
        'INSERT INTO pedidos (ra_aluno, nome_aluno) VALUES (?, ?)',
        [user.ra, user.nome]
    );

    const pedidoId = result.insertId;

    let total = 0;
    for (const item of itens) {
        await db.query(
            'INSERT INTO itens_pedido (id_pedido, id_produto, quantidade, preco_unitario) VALUES (?, ?, ?, ?)',
            [pedidoId, item.id_produto, item.quantidade, item.preco_unitario]
        );
        total += item.preco_unitario * item.quantidade;
    }

    // Acumular pontos
    const pontosGanhos = Math.floor(total);
    const [rows] = await db.query('SELECT * FROM pontos WHERE ra_aluno=?', [user.ra]);

    if (rows.length === 0) {
        await db.query('INSERT INTO pontos (ra_aluno, pontos) VALUES (?, ?)', [user.ra, pontosGanhos]);
    } else {
        await db.query('UPDATE pontos SET pontos = pontos + ? WHERE ra_aluno = ?', [pontosGanhos, user.ra]);
    }

    res.json({ message: 'Pedido criado com sucesso', pedidoId });
};

export const listarPedidos = async (req, res) => {
    const user = req.user;
    let rows;

    if (user.tipo === 'adm') {
        [rows] = await db.query('SELECT * FROM pedidos');
    } else {
        [rows] = await db.query('SELECT * FROM pedidos WHERE ra_aluno = ?', [user.ra]);
    }

    res.json(rows);
};

export const atualizarStatusPedido = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    await db.query('UPDATE pedidos SET status=? WHERE id=?', [status, id]);
    res.json({ message: 'Status do pedido atualizado' });
};
