import { db } from './db.js';

const testarConexao = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM funcionarios');
    console.log('Conectado ✅ Dados:', rows);
  } catch (error) {
    console.error('Erro na conexão ❌:', error);
  }
};

testarConexao();
