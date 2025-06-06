'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import connectBack from '../../../services/connectBack.js';
import './checkout.css';

export default function CheckoutPage() {
  const [carrinho, setCarrinho] = useState([]);
  const [user, setUser] = useState(null);
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const router = useRouter();

  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    const userSalvo = JSON.parse(localStorage.getItem('user'));
    if (!userSalvo) {
      router.push('/client/login');
      return;
    }
    setCarrinho(carrinhoSalvo);
    setUser(userSalvo);

    const hoje = new Date().toISOString().split('T')[0];
    setData(hoje);
  }, [router]);

  const subtotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );
  const pontosGanhos = Math.floor(subtotal);

  const finalizarCompra = () => {
    if (!data || !horario || !formaPagamento) {
      alert('Preencha todos os campos de agendamento e pagamento!');
      return;
    }

    const itensFormatados = carrinho.map((item) => ({
      id_produto: item.id,
      quantidade: item.quantidade,
      preco_unitario: item.preco,
    }));

    connectBack
      .post(
        '/pedidos',
        {
          itens: itensFormatados,
          data_retirada: data,
          horario_retirada: horario,
          forma_pagamento: formaPagamento,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .then(() => {
        localStorage.removeItem('carrinho');
        alert('Pedido realizado com sucesso!');
        router.push('/client/meuspedidos');
      })
      .catch(() => {
        alert('Erro ao finalizar o pedido!');
      });
  };

  if (!carrinho.length) {
    return (
      <div className="checkout-container">
        <div className="alert alert-warning mt-4">
          Carrinho vazio. <a href="/client/cardapio">Voltar ao cardápio</a>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Resumo do Pedido</h1>

      <div className="card-checkout">
        <h4>Itens no Pedido:</h4>
        <ul>
          {carrinho.map((item) => (
            <li key={`${item.id}-${item.sabor}`}>
              {item.nome_cardapio} {item.sabor && `(${item.sabor})`} -{' '}
              {item.quantidade}x R$ {item.preco.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <div className="card-checkout form-checkout">
        <h4>Agendamento da Retirada:</h4>
        <label>Data:</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />

        <label>Horário:</label>
        <select value={horario} onChange={(e) => setHorario(e.target.value)}>
          <option value="">Selecione o horário</option>
          <option value="09h40-10h00">09h40 - 10h00 (Intervalo da manhã)</option>
          <option value="12h30-13h00">12h30 - 13h00 (Intervalo do almoço)</option>
          <option value="15h00-15h20">15h00 - 15h20 (Intervalo da tarde)</option>
        </select>
      </div>

      <div className="card-checkout form-checkout">
        <h4>Forma de Pagamento:</h4>
        <select
          value={formaPagamento}
          onChange={(e) => setFormaPagamento(e.target.value)}
        >
          <option value="">Selecione a forma de pagamento</option>
          <option value="pix">PIX</option>
          <option value="cartao">Cartão</option>
          <option value="lanchonete">Pagar na Lanchonete</option>
        </select>
      </div>

      <div className="card-checkout">
        <div className="total-section">
          <span>Subtotal:</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>

        <div className="total-section">
          <span>Você ganhará:</span>
          <span>{pontosGanhos} BreadCoins</span>
        </div>

        <div className="total-section">
          <span>Total:</span>
          <span className="valor-total">R$ {subtotal.toFixed(2)}</span>
        </div>

        <button className="button-confirmar" onClick={finalizarCompra}>
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
}
