// backend/controllers/recompensaController.js

import { db } from '../config/db.js';

export const listarRecompensas = async (req, res) => {
  try {
    const [recompensas] = await db.query("SELECT id, nome, descricao, pontos_necessarios, imagem_url FROM recompensas ORDER BY pontos_necessarios");
    res.json(recompensas);
  } catch (error) {
    console.error("Erro ao listar recompensas:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export const criarRecompensa = async (req, res) => {
  const { nome, descricao, pontos_necessarios } = req.body;
  if (!nome || !pontos_necessarios) {
    return res.status(400).json({ message: "Nome e pontos são obrigatórios." });
  }
  try {
    const [result] = await db.query(
      "INSERT INTO recompensas (nome, descricao, pontos_necessarios) VALUES (?, ?, ?)",
      [nome, descricao || '', pontos_necessarios]
    );
    res.status(201).json({ id: result.insertId, message: "Recompensa criada com sucesso." });
  } catch (error) {
    console.error("Erro ao criar recompensa:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export const atualizarRecompensa = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, pontos_necessarios } = req.body;
  if (!nome || !pontos_necessarios) {
    return res.status(400).json({ message: "Nome e pontos são obrigatórios." });
  }
  try {
    await db.query(
      "UPDATE recompensas SET nome = ?, descricao = ?, pontos_necessarios = ? WHERE id = ?",
      [nome, descricao, pontos_necessarios, id]
    );
    res.status(200).json({ message: "Recompensa atualizada com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar recompensa:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export const uploadImagemRecompensa = async (req, res) => {
    const { id } = req.params;
    const imagem_url = req.file ? req.file.filename : null;
  
    if (!imagem_url) {
      return res.status(400).json({ message: "Nenhum arquivo de imagem enviado." });
    }
  
    try {
      await db.query("UPDATE recompensas SET imagem_url = ? WHERE id = ?", [imagem_url, id]);
      res.status(200).json({ message: "Imagem da recompensa atualizada com sucesso.", imagem_url });
    } catch (error) {
      console.error("Erro ao salvar imagem no banco:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  };

export const deletarRecompensa = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM recompensas WHERE id = ?", [id]);
    res.status(200).json({ message: "Recompensa deletada com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar recompensa:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};