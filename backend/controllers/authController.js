import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '../config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const secret = process.env.JWT_SECRET;

//  Caminho do arquivo JSON dos alunos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const alunosPath = path.resolve(
  __dirname,
  '../../frontend/public/api/alunos.json'
);

//  Lendo os dados dos alunos
let alunos = [];
try {
  const alunosRaw = fs.readFileSync(alunosPath, 'utf-8');
  alunos = JSON.parse(alunosRaw);
} catch (error) {
  console.error('Erro ao carregar alunos.json:', error);
}

//  Login ADM
export const loginAdm = async (req, res) => {
  const { nid, senha } = req.body;

  try {
    const [result] = await db.query(
      'SELECT * FROM funcionarios WHERE nid = ?',
      [nid]
    );

    if (result.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const user = result[0];
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, tipo: 'adm', nome: user.nome, nid: user.nid },
      secret,
      { expiresIn: '1d' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        nid: user.nid,
        cargo: user.cargo,
        tipo: 'adm',
      },
    });
  } catch (error) {
    console.error('Erro no login ADM:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

//  Login Aluno
export const loginAluno = async (req, res) => {
  const { login, senha } = req.body;

  try {
    const aluno = alunos.find((a) => a.ra === login);

    if (!aluno || aluno.senha !== senha) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: aluno.id, tipo: 'aluno', nome: aluno.nome, ra: aluno.ra },
      secret,
      { expiresIn: '1d' }
    );

    return res.json({
      token,
      user: {
        id: aluno.id,
        nome: aluno.nome,
        ra: aluno.ra,
        tipo: 'aluno',
      },
    });
  } catch (error) {
    console.error('Erro no login Aluno:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};
