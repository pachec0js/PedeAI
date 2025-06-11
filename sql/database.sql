-- 🔥 Criação do banco de dados 
DROP DATABASE IF EXISTS pedeai; 
CREATE DATABASE pedeai;
USE pedeai;

-- 👨‍💼 Funcionários
CREATE TABLE funcionarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nid VARCHAR(50) UNIQUE NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    telefone VARCHAR(20),
    data_contratacao DATE,
    ativo BOOLEAN DEFAULT TRUE
);

-- 🛍️ Produtos
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nome_cardapio VARCHAR(100) NOT NULL,
    sabor VARCHAR(100),
    preco DECIMAL(10,2) NOT NULL,
    estoque INT DEFAULT 0,
    categoria VARCHAR(50),
    descricao TEXT
);

-- 📦 Pedidos
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ra_aluno VARCHAR(20) NOT NULL,
    nome_aluno VARCHAR(100) NOT NULL,
    data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_retirada DATE NOT NULL,
    horario_retirada VARCHAR(20) NOT NULL,
    forma_pagamento ENUM('pix', 'cartao', 'lanchonete') NOT NULL,
    estatus ENUM('pendente', 'pronto', 'cancelado', 'entregue') DEFAULT 'pendente'
);

-- 🧾 Itens do pedido
CREATE TABLE itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT DEFAULT 1,
    preco_unitario DECIMAL(10,2),
    observacao TEXT,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES produtos(id)
);

-- ⭐ Pontos
CREATE TABLE pontos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ra_aluno VARCHAR(20) NOT NULL,
    pontos INT DEFAULT 0
);

-- 🎁 Recompensas
CREATE TABLE recompensas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    pontos_necessarios INT NOT NULL,
    imagem_url Varchar(255) Null
);

-- 🔄 Trocas (Loja de Pontos)
CREATE TABLE trocas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ra_aluno VARCHAR(20) NOT NULL,
    id_recompensa INT NOT NULL,
    pontos_gastos INT NOT NULL,
    data_troca DATETIME DEFAULT CURRENT_TIMESTAMP,
    agendamento DATETIME,
    FOREIGN KEY (id_recompensa) REFERENCES recompensas(id)
);
