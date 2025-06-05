import { db } from '../config/db.js';

export const criarPedido = async (req, res) => {
  const { itens } = req.body;
  const user = req.user;

  if (user.tipo !== 'aluno') {
    return res
      .status(403)
      .json({ message: 'Apenas alunos podem fazer pedidos' });
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

  const pontosGanhos = Math.floor(total);
  const [rows] = await db.query('SELECT * FROM pontos WHERE ra_aluno=?', [
    user.ra,
  ]);

  if (rows.length === 0) {
    await db.query('INSERT INTO pontos (ra_aluno, pontos) VALUES (?, ?)', [
      user.ra,
      pontosGanhos,
    ]);
  } else {
    await db.query('UPDATE pontos SET pontos = pontos + ? WHERE ra_aluno = ?', [
      pontosGanhos,
      user.ra,
    ]);
  }

  res.json({ message: 'Pedido criado com sucesso', pedidoId });
};

export const listarPedidos = async (req, res) => {
  const user = req.user;
  let pedidos = [];

  if (user.tipo === 'adm') {
    const [rows] = await db.query('SELECT * FROM pedidos');
    pedidos = rows;
  } else {
    const [rows] = await db.query('SELECT * FROM pedidos WHERE ra_aluno = ?', [
      user.ra,
    ]);
    pedidos = rows;
  }

  const pedidoIds = pedidos.map((p) => p.id);
  if (pedidoIds.length === 0) return res.json([]);

  const [itens] = await db.query(
    `SELECT ip.*, p.nome_cardapio, p.sabor
     FROM itens_pedido ip
     JOIN produtos p ON ip.id_produto = p.id
     WHERE ip.id_pedido IN (?)`,
    [pedidoIds]
  );

  const pedidosComItens = pedidos.map((pedido) => {
    const itensPedido = itens.filter((item) => item.id_pedido === pedido.id);
    const total = itensPedido.reduce(
      (sum, item) => sum + item.preco_unitario * item.quantidade,
      0
    );
    return {
      ...pedido,
      itens: itensPedido,
      total,
    };
  });

  res.json(pedidosComItens);
};

export const atualizarStatusPedido = async (req, res) => {
  const { id } = req.params;
  const { estatus } = req.body;

  await db.query('UPDATE pedidos SET estatus = ? WHERE id = ?', [estatus, id]);
  res.json({ message: 'Status do pedido atualizado com sucesso' });
};
