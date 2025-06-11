# 🥪 PedeAI – Sistema de Encomendas para Cantina Escolar

![Status](https://img.shields.io/badge/status-em_desenvolvimento-yellow)

**PedeAI** é um sistema web completo desenvolvido como Projeto Integrador para o curso de Desenvolvimento de Sistemas do SENAI. O objetivo do projeto é modernizar e otimizar o processo de pedidos na cantina escolar, permitindo que alunos realizem encomendas antecipadas, escolham horários de retirada e participem de um programa de fidelidade, enquanto a administração da cantina gerencia todo o fluxo de forma centralizada e eficiente.

---

## 📜 Índice

- [História e Justificativa](#-história-e-justificativa)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Modelagem de Dados (Diagrama)](#-modelagem-de-dados-diagrama)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura da API (Endpoints)](#-estrutura-da-api-endpoints)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Equipe](#-equipe)
- [Licença](#-licença)

---

## 📖 História e Justificativa

Na ETEC Manoel Teodoro, a cantina de Dona Alice enfrentava um problema crônico: filas enormes nos intervalos, fazendo com que muitos alunos perdessem seu tempo de descanso. Observando essa situação, a gestora pedagógica, Profa. Ivete Borges, propôs uma solução inovadora: desafiar os alunos do curso de Desenvolvimento de Sistemas a criar uma plataforma digital para a cantina.

O **PedeAI** nasceu dessa necessidade. O objetivo do projeto é desenvolver e implementar um sistema de encomendas que permita aos clientes da cantina realizar pedidos antecipadamente, agendando a retirada. Isso visa otimizar drasticamente o fluxo de atendimento, evitar filas, melhorar a organização da produção de lanches e, o mais importante, garantir que os alunos tenham uma experiência mais eficiente e prática, aproveitando ao máximo seu recreio.

---

## 🚀 Funcionalidades Principais

### 🎓 **Área do Aluno (Cliente)**

-   **Autenticação:** Login seguro para alunos (utilizando uma API JSON simulada).
-   **Cardápio Dinâmico:** Visualização do cardápio completo, separado por categorias e com busca de produtos e combos.
-   **Página de Detalhes:** Visualização de produtos com múltiplos sabores e opções de personalização.
-   **Personalização de Itens:** Adição de observações a cada item do pedido (ex: "sem cebola").
-   **Carrinho de Compras:** Gerenciamento completo dos itens selecionados antes de finalizar o pedido.
-   **Checkout com Agendamento:** Processo de pagamento com múltiplos métodos (Cartão, Pix, na Retirada) e escolha de horários de retirada.
-   **Meus Pedidos:** Histórico de pedidos e resgates de pontos, com opção de cancelar pedidos pendentes (com 15 minutos de antecedência) e recomprar pedidos antigos.
-   **Loja de Pontos:** Sistema de fidelidade onde cada R$1,00 gasto gera 1 ponto (BreadCoin), com uma loja para troca de pontos por combos.
-   **Chatbot Inteligente (BreadBot):** Assistente virtual com IA (Google Gemini) treinado com os dados da cantina para responder dúvidas sobre o cardápio, horários, pagamentos e sobre o projeto.

### 💼 **Área Administrativa**

-   **Autenticação Segura:** Login para funcionários com senha criptografada (bcrypt) e autorização baseada em token (JWT).
-   **Dashboard Data-Driven:** Painel com métricas em tempo real, como receita total, total de pedidos, clientes únicos e gráficos de vendas semanais.
-   **Gerenciamento de Pedidos:** Visualização de todos os pedidos, separados por status (Pendente, Pronto, Entregue, Cancelado), com opções para alterar o status ou deletar um pedido.
-   **Gerenciamento de Cardápio (CRUD):** Interface completa para criar, visualizar, editar e deletar produtos e suas variações.
-   **Gerenciamento de Combos (CRUD):** Ferramentas para criar, editar, deletar e fazer upload de imagens para os combos da loja de pontos.
-   **Visualização de Alunos:** Tela para visualizar os alunos cadastrados e seus respectivos saldos de pontos.

---

## 🗃️ Modelagem de Dados (Diagrama)

A modelagem de dados foi estruturada para suportar todas as funcionalidades do sistema, separando produtos, pedidos, usuários e o sistema de fidelidade de forma relacional. O diagrama abaixo representa as entidades, atributos e relações do banco de dados.

![Diagrama de Entidade-Relacionamento do PedeAI](https://i.imgur.com/gK0r9tK.png)

---

## 🛠️ Tecnologias Utilizadas

### **Frontend (Lado do Cliente)**
-   **Next.js (com App Router):** Framework principal em React para construir a interface do usuário, gerenciar rotas e otimizar o desempenho.
-   **React:** Biblioteca base para a construção dos componentes de interface e gerenciamento de estados (`useState`, `useEffect`).
-   **Bootstrap:** Utilizado para a estilização dos componentes e criação de um layout responsivo.
-   **React Toastify:** Para exibir notificações (toasts) de sucesso, erro e aviso, melhorando a experiência do usuário.
-   **Chart.js (com React-Chartjs-2):** Para criar e exibir os gráficos de dados no dashboard do administrador.

### **Backend (Lado do Servidor)**
-   **Node.js:** Ambiente de execução que permite rodar JavaScript no lado do servidor.
-   **Express.js:** Framework para construir e organizar as rotas da API REST.
-   **JWT (JSON Web Tokens):** Para a implementação do sistema de autenticação e proteção das rotas.
-   **Bcrypt:** Biblioteca para criptografar e verificar as senhas dos funcionários de forma segura.
-   **Multer:** Middleware para gerenciar o upload de arquivos, utilizado na funcionalidade de carregar imagens para os combos.
-   **Dotenv:** Para gerenciar as variáveis de ambiente (como chaves de API e segredos) de forma segura.

### **Banco de Dados**
-   **MySQL:** Sistema de gerenciamento de banco de dados relacional utilizado para armazenar todos os dados da aplicação.

### **Inteligência Artificial**
-   **Google Gemini:** Modelo de linguagem utilizado como cérebro do chatbot "Bread", com contexto dinâmico (RAG) para responder perguntas com base nos dados reais do banco de dados.

---

## 🌐 Estrutura da API (Endpoints)

A API foi organizada seguindo os princípios REST. As principais rotas são:

| Método | Rota                     | Descrição                                         | Protegida | Admin |
| :----- | :----------------------- | :------------------------------------------------ | :-------- | :---- |
| `POST` | `/api/auth/login`        | Autentica um funcionário.                         | Não       | Não   |
| `POST` | `/api/auth/login-aluno`  | Autentica um aluno (simulado).                    | Não       | Não   |
| `GET`  | `/api/produtos`          | Lista produtos agrupados para o cardápio.         | Não       | Não   |
| `GET`  | `/api/produtos/buscar`   | Busca produtos e combos por um termo.             | Não       | Não   |
| `GET`  | `/api/pedidos`           | Lista pedidos (do aluno ou todos, se for admin).  | Sim       | Não   |
| `POST` | `/api/pedidos`           | Cria um novo pedido.                              | Sim       | Não   |
| `PATCH`| `/api/pedidos/:id/cancelar`| Aluno cancela o próprio pedido.                   | Sim       | Não   |
| `GET`  | `/api/recompensas`       | Lista todos os combos/recompensas.                | Sim       | Não   |
| `GET`  | `/api/dashboard`         | Retorna todos os dados para o dashboard.          | Sim       | Sim   |
| `PUT`  | `/api/pedidos/:id`       | Admin atualiza o status de um pedido.             | Sim       | Sim   |
| `POST` | `/api/recompensas`       | Admin cria um novo combo.                         | Sim       | Sim   |
| `POST` | `/api/recompensas/imagem/:id`| Admin faz upload da imagem de um combo.         | Sim       | Sim   |
| `POST` | `/api/bread`             | Envia uma mensagem para o chatbot Gemini.         | Não       | Não   |

---

## 🚀 Como Executar o Projeto

### **Pré-requisitos**
-   [Node.js](https://nodejs.org/en/) (versão 20 ou superior)
-   [MySQL](https://www.mysql.com/) (ou um servidor compatível como MariaDB)
-   Um gerenciador de pacotes como [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

### **1. Backend**
```bash
# Navegue até a pasta do backend
cd backend

# Instale as dependências
npm install

# Crie um arquivo .env na raiz da pasta 'backend' e adicione as variáveis de ambiente
# (use .env.example como base). Exemplo:
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=sua_senha
# DB_NAME=pedeai
# DB_PORT=5000
# JWT_SECRET=seu_segredo_jwt
# GEMINI_API_KEY=sua_chave_gemini

# Execute o script SQL para criar o banco e popular os dados

# Inicie o servidor do backend
npm start
```

### **2. Frontend**
```bash
# Em um novo terminal, navegue até a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Crie um arquivo .env.local na raiz da pasta 'frontend'
# e adicione a URL da sua API
# Exemplo: NEXT_PUBLIC_API_URL=http://localhost:3000

# Inicie o servidor de desenvolvimento do Next.js
npm run dev
```
Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o projeto.

---

## 👨‍💻 Equipe

| Nome                      | Função                            |
| ------------------------- | --------------------------------- |
| Fábio Pacheco             | Gerente de Projetos / Backend     |
| Julia Tamura              | Frontend / Redator Técnico        |
| Isabelli Montenegro       | Frontend / UI Designer            |                     
| Giuliano Lino             | Backend  / UI Designer            |
| Luiz Gustavo              | Backend  / QA (Quality Assurance) |

---

## 📜 Licença

Projeto acadêmico sem fins comerciais, desenvolvido como Projeto Integrador para o SENAI.
