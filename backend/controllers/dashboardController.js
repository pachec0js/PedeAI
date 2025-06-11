// backend/controllers/dashboardController.js

import { db } from '../config/db.js';

export const getDashboardData = async (req, res) => {
  try {
    const [
      totalPedidosResult,
      totalVendidoResult,
      totalItensResult,
      totalAlunosResult,
      produtosMaisVendidosResult,
      vendasSemanaResult
    ] = await Promise.all([
      db.query("SELECT COUNT(id) as total FROM pedidos"),
      db.query("SELECT SUM(quantidade * preco_unitario) as total FROM itens_pedido"),
      db.query("SELECT SUM(quantidade) as total FROM itens_pedido"),
      db.query("SELECT COUNT(DISTINCT ra_aluno) as total FROM pedidos"),
      db.query(`
        SELECT p.nome_cardapio, SUM(ip.quantidade) as quantidade
        FROM itens_pedido ip
        JOIN produtos p ON ip.id_produto = p.id
        GROUP BY p.nome_cardapio
        ORDER BY quantidade DESC
        LIMIT 5;
      `),
      db.query(`
        SELECT 
          DATE(data_pedido) as dia,
          COUNT(id) as total
        FROM pedidos
        WHERE data_pedido >= CURDATE() - INTERVAL 6 DAY
        GROUP BY DATE(data_pedido)
        ORDER BY DATE(data_pedido);
      `)
    ]);

    const labelsDias = [];
    const dadosDias = [];
    const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const vendasPorDiaMap = new Map(
      vendasSemanaResult[0].map(item => [item.dia.toISOString().split('T')[0], item.total])
    );

    for (let i = 6; i >= 0; i--) {
      const data = new Date();
      data.setDate(data.getDate() - i);
      
      const diaFormatado = data.toISOString().split('T')[0];
      const diaSemana = diasDaSemana[data.getDay()];

      labelsDias.push(diaSemana);
      dadosDias.push(vendasPorDiaMap.get(diaFormatado) || 0);
    }
    
    const dashboardData = {
      totalPedidos: totalPedidosResult[0][0].total || 0,
      totalVendido: totalVendidoResult[0][0].total || 0,
      totalItensVendidos: totalItensResult[0][0].total || 0,
      totalAlunos: totalAlunosResult[0][0].total || 0,
      produtosMaisVendidos: produtosMaisVendidosResult[0],
      graficoVendasSemana: {
        labels: labelsDias,
        data: dadosDias,
      }
    };

    res.json(dashboardData);

  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    res.status(500).json({ message: "Erro interno do servidor ao buscar dados do dashboard." });
  }
};