-- 👨‍💼 Funcionários
INSERT INTO funcionarios (nid, cpf, nome, email, senha, cargo, telefone, data_contratacao, ativo) VALUES
('ADM001', '000.000.000-00', 'Admin Teste', 'admin@pedeai.com', '$2b$10$mtBh6IPjHtTUP3e9Srg/2Oqv4MJnKOLs6dY2eNY0b4q02YZceCvYy', 'Administrador', '11999999999', '2024-01-01', TRUE),
('FUNC001', '123.456.789-00', 'Carlos Silva', 'carlos@pedeai.com', '$2b$10$C9B6tlDSi8tynA/leoYfS.zzTkwHlGlsly4yWmPy5fvxmixS2hZBO', 'Gerente', '11999999999', '2024-01-15', TRUE),
('FUNC002', '987.654.321-00', 'Ana Souza', 'ana@pedeai.com', '$2b$10$xl1vYav.4Ltyj5WBXjlIjeVStn0oGErNwsnsvXDoCu20GYAklRJ3y', 'Atendente', '11988888888', '2024-02-01', TRUE);

-- Salgados com sabores
INSERT INTO produtos (nome, nome_cardapio, sabor, preco, estoque, categoria, descricao) VALUES
('Coxinha de Frango', 'Coxinha', 'Frango', 6.50, 50, 'Salgados', 'Coxinha recheada com frango desfiado temperado, um clássico irresistível.'),
('Coxinha de Costela', 'Coxinha', 'Costela', 6.50, 40, 'Salgados', 'Coxinha recheada com costela bovina desfiada, sabor marcante e suculento.'),
('Coxinha de Calabresa', 'Coxinha', 'Calabresa', 6.50, 30, 'Salgados', 'Coxinha recheada com calabresa moída bem temperada e suculenta.'),

('Empada de Frango', 'Empada', 'Frango', 5.00, 60, 'Salgados', 'Empada recheada com frango cremoso e bem temperado.'),
('Empada de Camarão', 'Empada', 'Camarão', 6.00, 40, 'Salgados', 'Empada deliciosa com recheio de camarão refogado.'),
('Empada de Carne', 'Empada', 'Carne', 5.00, 50, 'Salgados', 'Empada recheada com carne moída bem temperada.'),

('Risole de Frango', 'Risole', 'Frango', 4.50, 70, 'Salgados', 'Risole crocante recheado com frango desfiado.'),
('Risole de Carne', 'Risole', 'Carne', 4.50, 70, 'Salgados', 'Risole recheado com carne moída bem temperada.'),
('Risole de Queijo', 'Risole', 'Queijo', 4.50, 70, 'Salgados', 'Risole recheado com queijo derretido.'),

-- Salgados únicos
('Pão de Queijo', 'Pão de Queijo', '', 3.50, 100, 'Salgados', 'Pão de queijo tradicional, crocante por fora e macio por dentro.'),

-- Esfirras
('Esfirra de Calabresa', 'Esfirra', 'Calabresa', 4.00, 80, 'Salgados', 'Esfirra aberta recheada com calabresa picada.'),
('Esfirra de Carne', 'Esfirra', 'Carne', 4.00, 80, 'Salgados', 'Esfirra aberta recheada com carne moída bem temperada.'),
('Esfirra de Queijo', 'Esfirra', 'Queijo', 4.00, 80, 'Salgados', 'Esfirra aberta recheada com queijo derretido.'),

-- Hambúrgueres
('Hambúrguer X-Salada', 'Hambúrguer', 'X-Salada', 12.00, 30, 'Salgados', 'Hambúrguer tradicional com queijo, alface, tomate e maionese.'),
('Hambúrguer X-Egg', 'Hambúrguer', 'X-Egg', 13.00, 30, 'Salgados', 'Hambúrguer com queijo, ovo, alface, tomate e maionese.'),
('Hambúrguer Cheddar', 'Hambúrguer', 'Cheddar', 14.00, 30, 'Salgados', 'Hambúrguer com cheddar cremoso e carne suculenta.'),

-- Bebidas
('Coca-Cola (Lata)', 'Refrigerante', 'Coca-Cola', 5.00, 100, 'Bebidas', 'Refrigerante Coca-Cola lata gelada.'),
('Guaraná (Lata)', 'Refrigerante', 'Guaraná', 4.50, 100, 'Bebidas', 'Refrigerante Guaraná Antarctica lata.'),
('Sprite (Lata)', 'Refrigerante', 'Sprite', 4.50, 100, 'Bebidas', 'Refrigerante Sprite lata.'),
('Suco de Maracujá', 'Suco', 'Maracujá', 6.00, 50, 'Bebidas', 'Suco natural de maracujá.'),
('Suco de Morango', 'Suco', 'Morango', 6.00, 50, 'Bebidas', 'Suco natural de morango.'),
('Suco de Laranja', 'Suco', 'Laranja', 6.00, 50, 'Bebidas', 'Suco natural de laranja.'),

-- Doces
('Carolina (Doce de Leite)', 'Carolina', 'Doce de Leite', 3.00, 80, 'Doces', 'Carolina recheada com doce de leite.'),
('Sonho (Creme)', 'Sonho', 'Creme', 4.00, 70, 'Doces', 'Sonho macio recheado com creme.'),
('Torta de Limão (Fatia)', 'Torta', 'Limão', 7.00, 40, 'Doces', 'Fatia de torta de limão com cobertura de suspiro.'),
('Torta de Morango (Fatia)', 'Torta', 'Morango', 7.50, 40, 'Doces', 'Fatia de torta de morango fresca.'),
('Bolo de Chocolate (Fatia)', 'Bolo', 'Chocolate', 6.50, 50, 'Doces', 'Fatia de bolo de chocolate com cobertura.'),
('Bolo de Ninho (Fatia)', 'Bolo', 'Ninho', 7.00, 50, 'Doces', 'Bolo de leite ninho, macio e saboroso.'),
('Bolo de Cenoura (Fatia)', 'Bolo', 'Cenoura', 6.50, 50, 'Doces', 'Bolo de cenoura com cobertura de chocolate.'),
('Cookies (Chocolate)', 'Cookies', '', 3.50, 60, 'Doces', 'Cookies de chocolate crocante.'),
('Croissant de Nutella', 'Croissant', '', 8.00, 30, 'Doces', 'Croissant recheado com Nutella.');

-- 🧾 Pedidos
INSERT INTO pedidos (ra_aluno, nome_aluno, data_pedido, estatus) VALUES
('RA001', 'João Pedro', '2025-05-28 08:30:00', 'pendente'),
('RA002', 'Mariana Costa', '2025-05-28 08:45:00', 'pronto'),
('RA001', 'João Pedro', '2025-05-27 10:00:00', 'cancelado');

-- 📦 Itens dos pedidos
INSERT INTO itens_pedido (id_pedido, id_produto, quantidade, preco_unitario) VALUES
(1, 1, 2, 6.50),         -- 2 Coxinhas Frango
(1, 18, 1, 5.00),        -- 1 Coca-Cola
(2, 4, 1, 5.00),         -- 1 Empada de Frango
(2, 21, 1, 4.50),        -- 1 Sprite
(3, 7, 1, 4.50);         -- 1 Risole de Carne

-- ⭐ Pontos dos alunos
INSERT INTO pontos (ra_aluno, pontos) VALUES
('RA001', 50),
('RA002', 30),
('RA003', 0);

-- 🎁 Recompensas da loja de pontos
INSERT INTO recompensas (nome, descricao, pontos_necessarios) VALUES
('Vale Coxinha', 'Troque por uma coxinha grátis.', 20),
('Suco Grátis', 'Troque por um suco gratuito.', 30);

-- 🔄 Trocas realizadas (Resgates)
INSERT INTO trocas (ra_aluno, id_recompensa, pontos_gastos, data_troca) VALUES
('RA001', 1, 20, '2025-05-27 11:00:00'),
('RA002', 2, 30, '2025-05-28 09:00:00');
