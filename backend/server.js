import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.js';
import produtoRoutes from './routes/produtos.js';
import pedidoRoutes from './routes/pedidos.js';
import pontoRoutes from './routes/pontos.js';
import recompensaRoutes from './routes/recompensas.js';
import trocaRoutes from './routes/trocas.js';
import dashboardRoutes from './routes/dashboard.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/pontos', pontoRoutes);
app.use('/api/recompensas', recompensaRoutes);
app.use('/api/trocas', trocaRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.DB_PORT;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
