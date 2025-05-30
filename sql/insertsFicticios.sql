-- Funcionários
INSERT INTO funcionarios (nid, cpf, nome, email, senha, cargo, telefone, data_contratacao, ativo) VALUES
('ADM001', '000.000.000-00', 'Admin Teste', 'admin@pedeai.com', '$2b$10$mtBh6IPjHtTUP3e9Srg/2Oqv4MJnKOLs6dY2eNY0b4q02YZceCvYy', 'Administrador', '11999999999', '2024-01-01', TRUE),
                                                                    --   Senha: 12345
('FUNC001', '123.456.789-00', 'Carlos Silva', 'carlos@pedeai.com', '$2b$10$C9B6tlDSi8tynA/leoYfS.zzTkwHlGlsly4yWmPy5fvxmixS2hZBO' , 'Gerente', '11999999999', '2024-01-15', TRUE),
                                                                    --   Senha: senhalol
('FUNC002', '987.654.321-00', 'Ana Souza', 'ana@pedeai.com', '$2b$10$xl1vYav.4Ltyj5WBXjlIjeVStn0oGErNwsnsvXDoCu20GYAklRJ3y', 'Atendente', '11988888888', '2024-02-01', TRUE);
                                                                    --   Senha: senha456

-- Produtos
INSERT INTO produtos (nome, preco, estoque, categoria) VALUES
('Coxinha', 5.00, 100, 'Salgados'),
('Suco de Laranja', 4.50, 50, 'Bebidas'),
('Pão de Queijo', 3.00, 75, 'Salgados'),
('Refrigerante', 6.00, 60, 'Bebidas');

-- Pedidos
INSERT INTO pedidos (ra_aluno, nome_aluno, data_pedido, estatus) VALUES
('RA001', 'João Pedro', '2025-05-28 08:30:00', 'pendente'),
('RA002', 'Mariana Costa', '2025-05-28 08:45:00', 'pronto'),
('RA001', 'João Pedro', '2025-05-27 10:00:00', 'cancelado');

-- Itens dos pedidos
INSERT INTO itens_pedido (id_pedido, id_produto, quantidade, preco_unitario) VALUES
(1, 1, 2, 5.00),         -- Pedido 1 - 2 Coxinhas
(1, 2, 1, 4.50),         -- Pedido 1 - 1 Suco
(2, 3, 1, 3.00),         -- Pedido 2 - 1 Pão de Queijo
(2, 4, 1, 6.00),         -- Pedido 2 - 1 Refrigerante
(3, 1, 1, 5.00);         -- Pedido 3 - 1 Coxinha

-- Pontos dos alunos
INSERT INTO pontos (ra_aluno, pontos) VALUES
('RA001', 50),
('RA002', 30),
('RA003', 0);

-- Recompensas da loja de pontos
INSERT INTO recompensas (nome, descricao, pontos_necessarios) VALUES
('Vale Coxinha', 'Troque por uma coxinha grátis.', 20),
('Suco Grátis', 'Troque por um suco gratuito.', 30);

-- Trocas realizadas (Resgates)
INSERT INTO trocas (ra_aluno, id_recompensa, pontos_gastos, data_troca) VALUES
('RA001', 1, 20, '2025-05-27 11:00:00'),   -- João trocou por uma coxinha
('RA002', 2, 30, '2025-05-28 09:00:00');   -- Mariana trocou por um suco
