-- 👨‍💼 Funcionários
INSERT INTO funcionarios (nid, cpf, nome, email, senha, cargo, telefone, data_contratacao, ativo) VALUES
('ADM001', '000.000.000-00', 'Admin Teste', 'admin@pedeai.com', '$2b$10$mtBh6IPjHtTUP3e9Srg/2Oqv4MJnKOLs6dY2eNY0b4q02YZceCvYy', 'Administrador', '11999999999', '2024-01-01', TRUE), -- Senha: admin
('FUNC001', '123.456.789-00', 'Carlos Silva', 'carlos@pedeai.com', '$2b$10$C9B6tlDSi8tynA/leoYfS.zzTkwHlGlsly4yWmPy5fvxmixS2hZBO', 'Gerente', '11999999999', '2024-01-15', TRUE), -- Senha: carlos123
('FUNC002', '987.654.321-00', 'Ana Souza', 'ana@pedeai.com', '$2b$10$xl1vYav.4Ltyj5WBXjlIjeVStn0oGErNwsnsvXDoCu20GYAklRJ3y', 'Atendente', '11988888888', '2024-02-01', TRUE), -- Senha: ana123
('FUNC003', '111.222.333-44', 'Beatriz Lima', 'beatriz@pedeai.com', '$2b$10$gL3oXeQ5M5b.a3g7A5H2.e1B5B2yE1A5c5F8D9G6H7i2J0k4L1M5', 'Cozinheira', '11977777777', '2024-03-10', TRUE), -- Senha: bia2024
('FUNC004', '444.555.666-77', 'Ricardo Mendes', 'ricardo@pedeai.com', '$2b$10$z.ABC.defGHI.jklMNO.pqrSTU.vwxYZ1234567890abc', 'Caixa', '11966666666', '2024-04-01', FALSE); -- Senha: r_mendes

-- 🛍️ Produtos
INSERT INTO produtos (nome, nome_cardapio, sabor, preco, estoque, categoria, descricao) VALUES
('Coxinha de Frango', 'Coxinha', 'Frango', 6.50, 50, 'Salgados', 'A coxinha de frango traz um recheio bem temperado e suculento. A massa é macia por dentro e crocante por fora, frita na hora. Um clássico que nunca sai de moda e agrada todos os gostos.'),
('Coxinha de Costela', 'Coxinha', 'Costela', 6.50, 40, 'Salgados', 'A costela desfiada temperada lentamente deixa o recheio muito saboroso. É envolvida em uma massa leve e crocante, perfeita para qualquer hora. Um toque especial para quem gosta de sabores marcantes.'),
('Coxinha de Calabresa', 'Coxinha', 'Calabresa', 6.50, 30, 'Salgados', 'A coxinha recheada com calabresa tem um sabor levemente picante. Ela é frita na hora, garantindo uma casquinha dourada irresistível. O recheio é bem servido, garantindo satisfação em cada mordida.'),
('Empada de Frango', 'Empada', 'Frango', 5.00, 60, 'Salgados', 'A empada de frango é recheada com frango desfiado e cremoso. A massa é amanteigada, desmancha na boca e é assada no ponto certo. É leve, deliciosa e perfeita para qualquer momento do dia.'),
('Empada de Camarão', 'Empada', 'Camarão', 6.00, 40, 'Salgados', 'Recheio de camarão temperado com leve toque de ervas finas. A massa crocante e macia combina perfeitamente com o recheio sofisticado. Ideal para quem busca um salgado mais elaborado e especial.'),
('Empada de Carne', 'Empada', 'Carne', 5.00, 50, 'Salgados', 'A empada de carne tem recheio suculento, bem temperado e sabor marcante. A massa leve e amanteigada equilibra o recheio na medida certa. Uma combinação clássica, perfeita para o dia a dia.'),
('Risole de Frango', 'Risole', 'Frango', 4.50, 70, 'Salgados', 'O risole de frango tem massa crocante por fora e recheio cremoso por dentro. Feito com frango bem temperado e desfiado na medida certa. É um salgado versátil que agrada todos os gostos.'),
('Risole de Carne', 'Risole', 'Carne', 4.50, 70, 'Salgados', 'O recheio de carne moída é temperado com cuidado, bem saboroso. A massa é sequinha e leve, perfeita para um lanche delicioso. Uma opção ideal para quem gosta de salgados tradicionais.'),
('Risole de Queijo', 'Risole', 'Queijo', 4.50, 70, 'Salgados', 'Feito com queijo derretido e massa crocante, é uma explosão de sabor. Cada mordida traz cremosidade e aquele toque caseiro. Ideal para quem ama queijo e não resiste a um bom salgado.'),
('Pão de Queijo', 'Pão de Queijo', 'Tradicional', 3.50, 100, 'Salgados', 'Nosso clássico pão de queijo é feito com ingredientes de qualidade e muito queijo. A massa é leve por dentro, crocante por fora e assada na hora. Ideal para acompanhar um café quente ou um suco gelado.'),
('Esfirra de Calabresa', 'Esfirra', 'Calabresa', 4.00, 80, 'Salgados', 'A esfirra de calabresa tem recheio farto e sabor levemente picante. A massa é assada e fofinha, com cobertura dourada e crocante. Ideal para quem gosta de sabores marcantes e tradicionais.'),
('Esfirra de Carne', 'Esfirra', 'Carne', 4.00, 80, 'Salgados', 'Recheada com carne moída bem temperada e suculenta. A massa leve assada combina com o recheio em cada mordida. Uma opção muito popular e querida por todos.'),
('Esfirra de Queijo', 'Esfirra', 'Queijo', 4.00, 80, 'Salgados', 'Com muito queijo derretido e massa leve e assada no ponto. Sabor suave e marcante para quem prefere algo mais leve. Uma opção vegetariana cheia de sabor.'),
('Hambúrguer X-Salada', 'Hambúrguer', 'X-Salada', 12.00, 30, 'Salgados', 'Pão fofinho, hambúrguer suculento, queijo, alface e tomate fresquinhos. Uma combinação clássica e nutritiva para a hora do lanche. Feito na hora com ingredientes selecionados.'),
('Hambúrguer X-Egg', 'Hambúrguer', 'X-Egg', 13.00, 30, 'Salgados', 'Além da salada e queijo, vem com ovo no ponto certo. Um hambúrguer reforçado, ideal para a fome de verdade. Combinação deliciosa e muito nutritiva.'),
('Hambúrguer Cheddar', 'Hambúrguer', 'Cheddar', 14.00, 30, 'Salgados', 'Recheado com queijo cheddar derretido que dá sabor especial. Uma explosão de sabor para quem ama queijo. Pão leve e carne suculenta fazem o lanche perfeito.'),
('Coca-Cola (Lata)', 'refrigerante', 'Coca-Cola', 5.00, 100, 'Bebidas', 'A clássica Coca-Cola é sempre uma escolha certeira para acompanhar qualquer lanche. Seu sabor único e refrescante agrada todos os gostos. Servida bem gelada para garantir ainda mais prazer.'),
('Guaraná (Lata)', 'refrigerante', 'Guaraná', 4.50, 100, 'Bebidas', 'Leve, doce na medida certa e cheia de sabor natural. O Guaraná é uma opção refrescante para quem busca algo tradicional e brasileiro. Combina perfeitamente com doces ou salgados.'),
('Sprite (Lata)', 'refrigerante', 'Sprite', 4.50, 100, 'Bebidas', 'Com sabor cítrico suave e muito gás, o Sprite é super refrescante. Ótimo para acompanhar doces ou alimentos mais gordurosos. Leve e delicioso, ideal para quem prefere bebidas menos doces.'),
('Suco de Maracujá', 'Suco', 'Maracujá', 6.00, 50, 'Bebidas', 'Refrescante e levemente ácido, ideal para equilibrar sabores mais fortes. Feito com fruta natural, oferece um sabor tropical irresistível. Ajuda a acalmar e traz uma sensação de frescor imediato.'),
('Suco de Morango', 'Suco', 'Morango', 6.00, 50, 'Bebidas', 'Feito com morangos frescos, tem sabor adocicado e marcante. Refrescante e vibrante, é ideal para qualquer hora do dia. Combina muito bem com bolos, cookies ou salgados suaves.'),
('Suco de Laranja', 'Suco', 'Laranja', 6.00, 50, 'Bebidas', 'Clássico e nutritivo, o suco de laranja é sempre uma boa pedida. Feito com laranjas espremidas na hora para manter o frescor. Rico em vitamina C e muito saboroso.'),
('Café', 'Bebidas Quentes', 'Café', 3.50, 50, 'Bebidas', 'Café fresquinho, forte e aromático, perfeito para começar o dia. Feito com grãos selecionados e preparado com carinho. Vai muito bem com pão de queijo ou bolo de cenoura.'),
('Achocolatado', 'Bebidas Quentes', 'Achocolatado', 4.50, 50, 'Bebidas', 'Cremoso, doce e muito gostoso, agrada crianças e adultos. Feito com leite quentinho e chocolate na medida certa. Perfeito para acompanhar cookies, sonhos ou carolinas.'),
('Cappuccino', 'Bebidas Quentes', 'Cappuccino', 5.50, 50, 'Bebidas', 'Mistura equilibrada de café, leite e chocolate com um toque de canela. Cremoso, quente e muito saboroso, ideal para o lanche da tarde. Vai muito bem com croissant ou bolo de ninho.'),
('Carolina (Doce de Leite)', 'Carolina', 'Doce de Leite', 3.00, 80, 'Doces', 'Massa leve e recheio cremoso de doce de leite. Cobertura delicada e sabor marcante. Perfeito para adoçar o dia com uma sobremesa clássica.'),
('Sonho (Creme)', 'Sonho', 'Creme', 4.00, 70, 'Doces', 'Massa fofinha e recheio generoso de creme. Polvilhado com açúcar para dar o toque final. Feito no capricho, como nas melhores padarias.'),
('Torta de Limão (Fatia)', 'Torta', 'Limão', 7.00, 40, 'Doces', 'Base crocante, recheio suave e cobertura de merengue. O sabor azedinho do limão é refrescante e equilibrado. Perfeita para quem ama sobremesas leves.'),
('Torta de Morango (Fatia)', 'Torta', 'Morango', 7.50, 40, 'Doces', 'Feita com morangos frescos e creme leve e doce. Massa crocante e cobertura caprichada. Delicada, saborosa e com visual irresistível.'),
('Bolo de Chocolate (Fatia)', 'Bolo', 'Chocolate', 6.50, 50, 'Doces', 'Massa fofa e cobertura cremosa de chocolate. Recheio com sabor intenso, perfeito para os chocólatras. Uma fatia que agrada crianças e adultos.'),
('Bolo de Ninho (Fatia)', 'Bolo', 'Ninho', 7.00, 50, 'Doces', 'Feito com leite Ninho e cobertura cremosa e delicada. Sabor suave, doce na medida certa. Ideal para quem prefere sabores mais leves.'),
('Bolo de Cenoura (Fatia)', 'Bolo', 'Cenoura', 6.50, 50, 'Doces', 'Clássico da confeitaria com cobertura de chocolate. Massa úmida, sabor natural e equilibrado. Ideal para qualquer hora do dia.'),
('Cookies (Chocolate)', 'Cookies', 'Chocolate', 3.50, 60, 'Doces', 'Cookies macios por dentro e crocantes por fora. Recheados com gotas de chocolate que derretem na boca. Um clássico doce que nunca decepciona.'),
('Croissant de Nutella', 'Croissant', 'Nutella', 8.00, 30, 'Doces', 'Massa folhada e crocante com recheio cremoso de chocolate. Cada mordida traz uma explosão de sabor. Ideal para quem ama doces intensos e sofisticados.');

-- 🎁 Recompensas (Mantido conforme o original)
INSERT INTO recompensas (id, nome, descricao, pontos_necessarios, imagem_url) VALUES
(1, 'Pão de Queijo + Café', 'O clássico pão de queijo quentinho e macio combina perfeitamente com o sabor forte do café. Uma dupla simples, mas cheia de tradição e conforto.', 50, 'combo1.png'),
(2, 'Coxinha (Frango) + Suco de Maracujá', 'A coxinha de frango é crocante por fora e suculenta por dentro. O suco de maracujá traz o equilíbrio ideal com seu toque refrescante e levemente ácido.', 75, 'combo2.png'),
(3, 'Hambúrguer + Coca-Cola', 'Um lanche completo e cheio de sabor, com hambúrguer caprichado no pão macio. A Coca-Cola gelada fecha o combo com muito frescor e gás.', 100, 'combo3.png'),
(4, 'Carolina + Sprite', 'A carolina recheada com doce de leite derrete na boca com sua casquinha leve. A leveza do Sprite ajuda a equilibrar o sabor adocicado do doce.', 70, 'combo4.png'),
(5, 'Bolo de Chocolate + Suco de Morango', 'O bolo de chocolate é úmido, macio e cheio de sabor intenso. O suco de morango traz um frescor adocicado que complementa o bolo perfeitamente.', 140, 'combo5.png'),
(6, 'Cookies + Leite com Achocolatado', 'Cookies crocantes e recheados com gotas de chocolate. O leite com achocolatado acompanha de forma cremosa e reconfortante. Um combo que lembra o sabor da infância.', 70, 'combo6.png'),
(7, 'Croissant (Nutella) + Cappuccino', 'O croissant é folhado, leve e recheado com deliciosa Nutella. O capuccino completa o combo com seu sabor encorpado e aroma inconfundível. Um lanche sofisticado.', 150, 'combo7.png');

-- 📦 Pedidos (Histórico Robusto)
INSERT INTO pedidos (ra_aluno, nome_aluno, data_pedido, estatus, data_retirada, horario_retirada, forma_pagamento) VALUES
-- Pedidos de 6 dias atrás (pouco movimento)
('2345673', 'Alice Pereira da Silva', '2025-06-05 09:10:00', 'entregue', '2025-06-05', '09h40-10h00', 'pix'),
-- Pedidos de 5 dias atrás
('2345674', 'Bernardo Oliveira Costa', '2025-06-06 12:05:00', 'entregue', '2025-06-06', '12h30-13h00', 'cartao'),
('2345671', 'Fábio Andrade Pacheco', '2025-06-06 15:00:00', 'entregue', '2025-06-06', '15h00-15h20', 'lanchonete'),
-- Pedidos de 4 dias atrás (pico de movimento)
('2345672', 'Paula Duarte Martins Vasconcelos', '2025-06-07 09:30:00', 'pronto', '2025-06-07', '09h40-10h00', 'pix'),
('2345675', 'Carlos Martins Rodrigues', '2025-06-07 09:35:00', 'entregue', '2025-06-07', '09h40-10h00', 'cartao'),
('2345678', 'Felipe Ribeiro Gomes', '2025-06-07 12:40:00', 'entregue', '2025-06-07', '12h30-13h00', 'lanchonete'),
('2345683', 'Júlia Tamura', '2025-06-07 15:05:00', 'pronto', '2025-06-07', '15h00-15h20', 'pix'),
-- Pedidos de 3 dias atrás
('2345671', 'Fábio Andrade Pacheco', '2025-06-08 09:15:00', 'cancelado', '2025-06-08', '09h40-10h00', 'cartao'),
('2345688', 'Luís Gustavo', '2025-06-08 12:50:00', 'entregue', '2025-06-08', '12h30-13h00', 'pix'),
-- Pedidos de 2 dias atrás
('2345680', 'Hadassa Rocha de Jesus', '2025-06-09 09:45:00', 'pronto', '2025-06-09', '09h40-10h00', 'lanchonete'),
('2345691', 'Sara Teixeira Neves', '2025-06-09 12:35:00', 'entregue', '2025-06-09', '12h30-13h00', 'cartao'),
-- Pedidos de ontem
('2345673', 'Alice Pereira da Silva', '2025-06-10 09:50:00', 'entregue', '2025-06-10', '09h40-10h00', 'pix'),
('2345674', 'Bernardo Oliveira Costa', '2025-06-10 12:55:00', 'pronto', '2025-06-10', '12h30-13h00', 'cartao'),
('2345671', 'Fábio Andrade Pacheco', '2025-06-10 15:10:00', 'entregue', '2025-06-10', '15h00-15h20', 'lanchonete'),
-- Pedidos de hoje
('2345672', 'Paula Duarte Martins Vasconcelos', '2025-06-11 09:05:00', 'pronto', '2025-06-11', '09h40-10h00', 'pix');


-- 🧾 Itens dos pedidos
INSERT INTO itens_pedido (id_pedido, id_produto, quantidade, preco_unitario, observacao) VALUES
(1, 7, 2, 3.50, 'Um na manteiga, por favor'), (2, 1, 1, 6.50, 'Bem passado'), (2, 9, 1, 5.00, ''), (3, 4, 2, 5.00, ''),
(4, 1, 1, 6.50, ''), (4, 9, 1, 5.00, 'Sem catchup'), (5, 5, 2, 6.00, ''), (6, 8, 1, 12.00, 'Sem picles'),
(7, 12, 1, 6.50, 'Capricha na cobertura!'), (8, 4, 1, 5.00, 'Cancelado pelo usuário.'), (9, 10, 1, 6.00, ''), (10, 1, 3, 6.50, 'Um para viagem'),
(11, 12, 2, 6.50, ''), (12, 7, 1, 3.50, ''), (12, 11, 1, 3.50, ''), (13, 1, 1, 6.50, ''), (14, 4, 1, 5.00, ''),
(14, 9, 1, 4.50, 'Maionese à parte'), (15, 1, 1, 6.50, '');

-- ⭐ Pontos
INSERT INTO pontos (ra_aluno, pontos) VALUES
('2345671', 200), ('2345672', 150), ('2345673', 95), ('2345674', 80), ('2345675', 75),
('2345678', 60), ('2345680', 55), ('2345683', 40), ('2345688', 30), ('2345691', 25);

-- 🔄 Trocas
INSERT INTO trocas (ra_aluno, id_recompensa, pontos_gastos, agendamento) VALUES
('2345671', 1, 50, '2025-06-07 09:40:00'),
('2345672', 2, 75, '2025-06-08 15:00:00'),
('2345671', 3, 100, '2025-06-09 12:30:00'),
('2345674', 1, 50, '2025-06-10 09:40:00');