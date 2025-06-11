import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import { db } from '../config/db.js';

async function gerarContextoCompletoParaIA() {
  try {
    const [[produtosDoDB], [recompensasDoDB]] = await Promise.all([
      db.query("SELECT nome_cardapio, sabor, preco, categoria FROM produtos WHERE estoque > 0 ORDER BY categoria, nome_cardapio"),
      db.query("SELECT nome, descricao, pontos_necessarios FROM recompensas ORDER BY pontos_necessarios")
    ]);

    let contextoCardapio = "Nenhum produto encontrado no cardápio.";
    if (produtosDoDB.length > 0) {
      const produtosAgrupados = produtosDoDB.reduce((acc, produto) => {
        const key = produto.nome_cardapio;
        if (!acc[key]) {
          acc[key] = {
            nome_cardapio: produto.nome_cardapio,
            categoria: produto.categoria,
            variacoes: []
          };
        }
        acc[key].variacoes.push({ sabor: produto.sabor, preco: parseFloat(produto.preco) });
        return acc;
      }, {});

      contextoCardapio = "CARDÁPIO DISPONÍVEL:\n";
      for (const key in produtosAgrupados) {
        const produto = produtosAgrupados[key];
        const precos = produto.variacoes.map(v => v.preco);
        const precoMinimo = Math.min(...precos);
        const precoMaximo = Math.max(...precos);
        let linha = `- ${produto.nome_cardapio} (${produto.categoria})`;
        const temSabores = produto.variacoes.length > 1 && produto.variacoes.some(v => v.sabor && v.sabor.trim() !== '');
        if (temSabores) {
          const sabores = produto.variacoes.map(v => v.sabor).filter(Boolean).join(', ');
          linha += ` (Sabores: ${sabores})`;
        }
        if (precoMinimo !== precoMaximo) {
          linha += `: a partir de R$ ${precoMinimo.toFixed(2).replace('.', ',')}\n`;
        } else {
          linha += `: R$ ${precoMinimo.toFixed(2).replace('.', ',')}\n`;
        }
        contextoCardapio += linha;
      }
    }
    
    let contextoCombos = "Nenhum combo por pontos disponível.";
    if (recompensasDoDB.length > 0) {
      contextoCombos = "COMBOS DA LOJA DE PONTOS:\n";
      recompensasDoDB.forEach(combo => {
        contextoCombos += `- ${combo.nome}: ${combo.pontos_necessarios} pontos. (Descrição: ${combo.descricao})\n`;
      });
    }

    const contextoGeral = `
      SOBRE O PROJETO PedeAI:
      - História: Na ETEC Manoel Teodoro, a cantina de Dona Alice enfrentava filas enormes. A Profa. Ivete Borges propôs aos alunos de Desenvolvimento de Sistemas a criação de um sistema digital para receber pedidos antecipados e organizá-los por horário, otimizando o fluxo e melhorando a experiência de todos.
      - Objetivo: Permitir que os clientes da cantina realizem pedidos antecipadamente, escolhendo o horário de retirada para evitar filas.
      
      SOBRE VOCÊ (BREAD, O CHATBOT):
      - Você é o Bread, o mascote e chatbot do PedeAI. Sua função é oferecer suporte amigável, respondendo dúvidas sobre o cardápio, ingredientes, preços, formas de pagamento, prazos e etapas do pedido, garantindo um atendimento prático e humanizado.
      
      INFORMAÇÕES GERAIS DA CANTINA:
      - Horário de Funcionamento: Segunda a Sexta, das 7h às 17h.
      - Localização: Bloco A da ETEC Manoel Teodoro.
      - Métodos de Pagamento: Pix, Cartão e Pagamento na Retirada na própria lanchonete.
      - Agendamento de Retirada: Ao finalizar o pedido na página de checkout, o aluno pode escolher um dos horários disponíveis para retirar seu lanche. Os horários são:
        - Intervalo da Manhã: 09h40 às 10h00
        - Intervalo do Almoço: 12h30 às 13h00
        - Intervalo da Tarde: 15h00 às 15h20
      
      SISTEMA DE PONTOS (BREADCOINS):
      - Como funciona: A cada R$1,00 gasto em produtos, o aluno ganha 1 ponto (BreadCoin).
      - Utilidade: Os pontos podem ser trocados por combos especiais (recompensas) na Loja de Pontos.

      ${contextoCardapio}

      ${contextoCombos}
    `;

    return contextoGeral;

  } catch (error) {
    console.error("Erro ao gerar contexto para a IA:", error);
    return "Não foi possível carregar as informações da cantina no momento.";
  }
}

export const responderGemini = async (req, res) => {
  const { historico } = req.body;

  if (!historico || !Array.isArray(historico) || historico.length === 0) {
    return res.status(400).json({ erro: 'Histórico da conversa inválido ou vazio.' });
  }

  const contextoCompleto = await gerarContextoCompletoParaIA();
  const perguntaAtual = historico[historico.length - 1].texto;

  const promptFinal = `
    **Você é o Bread, um assistente virtual da cantina PedeAI.**
    Sua única função é responder perguntas usando as informações fornecidas na seção "CONTEXTO DA CANTINA".

    **REGRAS:**
    - **NÃO INVENTE NADA.** Se a resposta não estiver no contexto, diga que não tem essa informação.
    - Seja amigável e use emojis.
    - Responda de forma curta e direta.

    **Exemplos de como responder:**
    - Pergunta de exemplo: "Qual o horário?"
    - Resposta de exemplo: "Nós funcionamos de Segunda a Sexta, das 7h às 17h! 😉"
    - Pergunta de exemplo: "quanto é a coxinha?"
    - Resposta de exemplo: "A coxinha de Frango, Costela ou Calabresa custa R$6,50 cada. Qual sabor você gostaria? 😋"

    **CONTEXTO DA CANTINA (FONTE DE VERDADE):**
    ---
    ${contextoCompleto}
    ---
    
    **PERGUNTA ATUAL DO USUÁRIO:**
    "${perguntaAtual}"

    **SUA RESPOSTA:**
  `;

  try {
    const respostaGemini = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: promptFinal }] }],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 250,
        },
        safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const respostaTexto =
      respostaGemini.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Desculpe, não consegui processar sua pergunta no momento.';

    res.json({ resposta: respostaTexto });
  } catch (err) {
    console.error('Erro na chamada para a API Gemini:', err?.response?.data || err.message);
    res.status(500).json({ resposta: 'Ops! Parece que estou com um probleminha técnico. 🤖' });
  }
};