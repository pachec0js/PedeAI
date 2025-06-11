import { db } from '../config/db.js';

export const criarPedido = async (req, res) => {
  const { itens, data_retirada, horario_retirada, forma_pagamento } = req.body;
  const user = req.user;

  if (user.tipo !== 'aluno') {
    return res
      .status(403)
      .json({ message: 'Apenas alunos podem fazer pedidos' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO pedidos 
      (ra_aluno, nome_aluno, data_retirada, horario_retirada, forma_pagamento) 
      VALUES (?, ?, ?, ?, ?)`,
      [user.ra, user.nome, data_retirada, horario_retirada, forma_pagamento]
    );

    const pedidoId = result.insertId;
    let total = 0;

    for (const item of itens) {
      await db.query(
        `INSERT INTO itens_pedido 
        (id_pedido, id_produto, quantidade, preco_unitario, observacao) 
        VALUES (?, ?, ?, ?, ?)`,
        [pedidoId, item.id_produto, item.quantidade, item.preco_unitario, item.observacao || '']
      );
      total += item.preco_unitario * item.quantidade;
    }

    const pontosGanhos = Math.floor(total);
    const [rows] = await db.query('SELECT * FROM pontos WHERE ra_aluno = ?', [
      user.ra,
    ]);

    if (rows.length === 0) {
      await db.query(
        'INSERT INTO pontos (ra_aluno, pontos) VALUES (?, ?)',
        [user.ra, pontosGanhos]
      );
    } else {
      await db.query(
        'UPDATE pontos SET pontos = pontos + ? WHERE ra_aluno = ?',
        [pontosGanhos, user.ra]
      );
    }

    res.json({ message: 'Pedido criado com sucesso', pedidoId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar pedido' });
  }
};

export const listarPedidos = async (req, res) => {
  const user = req.user;
  let pedidos = [];

  try {
    if (user.tipo === 'adm') {
      const [rows] = await db.query('SELECT * FROM pedidos ORDER BY FIELD(estatus, "pendente", "pronto", "entregue", "cancelado"), data_pedido DESC');
      pedidos = rows;
    } else {
      const [rows] = await db.query(
        'SELECT * FROM pedidos WHERE ra_aluno = ? ORDER BY data_pedido DESC',
        [user.ra]
      );
      pedidos = rows;
    }

    if (pedidos.length === 0) return res.json([]);

    const pedidoIds = pedidos.map((p) => p.id);
    
    const [itens] = await db.query(
      `SELECT ip.*, p.nome, p.nome_cardapio, p.sabor
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar pedidos' });
  }
};

export const atualizarStatusPedido = async (req, res) => {
  const { id } = req.params;
  const { estatus } = req.body;

  if (!estatus) {
    return res.status(400).json({ message: "Novo status não fornecido." });
  }

  try {
    await db.query('UPDATE pedidos SET estatus = ? WHERE id = ?', [
      estatus,
      id,
    ]);
    res.json({ message: 'Status do pedido atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar status do pedido' });
  }
};

export const deletarPedido = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM pedidos WHERE id = ?", [id]);
    res.status(200).json({ message: "Pedido deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar pedido:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export const cancelarPedidoAluno = async (req, res) => {
  const { id } = req.params;
  const { ra: ra_aluno } = req.user;

  try {
    const [pedidos] = await db.query(
      "SELECT * FROM pedidos WHERE id = ? AND ra_aluno = ?",
      [id, ra_aluno]
    );

    if (pedidos.length === 0) {
      return res.status(404).json({ message: "Pedido não encontrado ou não pertence a você." });
    }

    const pedido = pedidos[0];

    if (pedido.estatus !== 'pendente') {
      return res.status(400).json({ message: `Não é possível cancelar um pedido com status "${pedido.estatus}".` });
    }

    const [hora, minuto] = pedido.horario_retirada.split('h');
    const dataRetirada = new Date(pedido.data_retirada);
    dataRetirada.setUTCHours(hora, minuto, 0, 0);

    const limiteCancelamento = new Date(dataRetirada.getTime() - 15 * 60 * 1000);
    const agora = new Date();

    if (agora > limiteCancelamento) {
      return res.status(400).json({ message: "O prazo para cancelamento (15 minutos antes da retirada) já expirou." });
    }

    await db.query("UPDATE pedidos SET estatus = 'cancelado' WHERE id = ?", [id]);
    
    res.status(200).json({ message: "Pedido cancelado com sucesso." });

  } catch (error) {
    console.error("Erro ao cancelar pedido pelo aluno:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};