# 🥪 PedeAI – Sistema de Encomendas para Cantina Escolar

**PedeAI** é um sistema desenvolvido como Projeto Integrador, com o objetivo de otimizar o processo de pedidos na cantina escolar, permitindo que alunos façam encomendas antecipadas e evitem filas. Além disso, oferece um painel administrativo para a cantina gerenciar produtos, pedidos e um programa de fidelidade baseado em pontos.

---

## 🚀 Funcionalidades

### 🎓 **Para os alunos:**

- Login com dados da ETEC (via API simulada em JSON)
- Visualização do cardápio (dinâmico e categorizado)
- Escolha de produtos (com personalização simples)
- Seleção do horário de retirada
- Resumo do pedido e envio
- Cancelamento de pedidos (até 15 minutos antes do horário selecionado)
- Histórico de pedidos (opcional)
- **Plano Fidelidade:** acumule pontos a cada compra
- **Loja de Pontos:** troque pontos por brindes ou produtos da cantina

### 🍳 **Para a cantina (funcionários):**

- Login administrativo
- Gerenciamento completo do cardápio (CRUD)
- Painel de pedidos por horário e status
- Atualização de status dos pedidos (Pendente, Cancelado, Retirado)
- Controle do programa de fidelidade
- Relatórios simples (produtos mais vendidos, horários mais movimentados) [opcional]

---

## 🔗 Tecnologias utilizadas

- **Next.js** (Frontend e API)
- **Node.js**
- **MySQL** (Banco de dados)
- **API JSON simulada** (dados dos alunos da ETEC)
- **CSS/Tailwind** ou CSS puro (dependendo do desenvolvimento)

---

## 🗃️ Estrutura do Banco de Dados

- Funcionários
- Produtos
- Pedidos
- Itens dos pedidos
- Pontos de Fidelidade
- Recompensas (Loja de Pontos)
- Resgates

---

## 📁 API Simulada (Alunos)

- Localizada em `/public/api/alunos.json`
- Usada exclusivamente para autenticação dos alunos

---

## 👨‍💻 Desenvolvedores

| Nome           | Função        |
| -------------- | ------------- |
| Fabio Pacheco  | Desenvolvedor |
| [Outros nomes] | [Funções]     |

---

## 📜 Licença

Projeto acadêmico sem fins comerciais, desenvolvido como Projeto Integrador da ETEC.

---

> _Este README está em desenvolvimento e será atualizado ao longo do projeto._
