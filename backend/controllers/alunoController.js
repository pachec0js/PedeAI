// backend/controllers/alunoController.js

import { promises as fs } from 'fs';
import path from 'path';
import { db } from '../config/db.js';

export const listarAlunosComPontos = async (req, res) => {
  try {
    const jsonPath = path.resolve(process.cwd(), '../frontend/public/api/alunos.json');
    
    const alunosJsonData = await fs.readFile(jsonPath, 'utf-8');
    const alunos = JSON.parse(alunosJsonData);

    if (alunos.length === 0) {
      return res.json([]);
    }

    const ras = alunos.map(aluno => aluno.ra);

    const [pontosResult] = await db.query(
      `SELECT ra_aluno, pontos FROM pontos WHERE ra_aluno IN (?)`,
      [ras]
    );

    const pontosMap = new Map(
      pontosResult.map(p => [p.ra_aluno, p.pontos])
    );

    const alunosComPontos = alunos.map(aluno => ({
      ...aluno,
      pontos: pontosMap.get(aluno.ra) || 0 
    }));

    res.json(alunosComPontos);

  } catch (error) {
    console.error("Erro ao listar alunos com pontos:", error);
    if (error.code === 'ENOENT') {
      return res.status(404).json({ message: "Arquivo de alunos não encontrado." });
    }
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};