import { db } from '../config/db.js';

export const obterDashboard = async (req, res) => {
    const user = req.user;
    if (user.tipo !== 'adm') {
        return res.status(403).json({ message: 'Acesso negado' });
    }

    const [[{ totalPedidos }]] = await db.query('SELECT COUNT(*) AS totalPedidos FROM pedidos');
    const [[{ totalVendido }]] = await db.query(
        `SELECT IFNULL(SUM(ip.preco_unitario * ip.quantidade), 0) AS totalVendido
         FROM itens_pedido ip`
    );
    const [produtosMaisVendidos] = await db.query(
        `SELECT p.nome, SUM(ip.quantidade) AS quantidade 
         FROM itens_pedido ip 
         JOIN produtos p ON ip.id_produto = p.id 
         GROUP BY p.nome 
         ORDER BY quantidade DESC 
         LIMIT 5`
    );

    res.json({
        totalPedidos,
        totalVendido,
        produtosMaisVendidos
    });
};
