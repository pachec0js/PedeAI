import { db } from '../config/db.js';

export const consultarPontos = async (req, res) => {
  const { ra } = req.params;
  const user = req.user;

  if (user.tipo !== 'adm' && user.ra !== ra) {
    return res.status(403).json({ message: 'Acesso negado' });
  }

  const [rows] = await db.query(
    'SELECT pontos FROM pontos WHERE ra_aluno = ?',
    [ra]
  );

  if (rows.length === 0) {
    return res.json({ pontos: 0 });
  }

  res.json({ pontos: rows[0].pontos });
};

export const atualizarPontos = async (req, res) => {
  const { ra } = req.params;
  const { pontos } = req.body;

  const [rows] = await db.query('SELECT * FROM pontos WHERE ra_aluno = ?', [
    ra,
  ]);

  if (rows.length === 0) {
    await db.query('INSERT INTO pontos (ra_aluno, pontos) VALUES (?, ?)', [
      ra,
      pontos,
    ]);
  } else {
    await db.query('UPDATE pontos SET pontos = ? WHERE ra_aluno = ?', [
      pontos,
      ra,
    ]);
  }

  res.json({ message: 'Pontos atualizados com sucesso' });
};
