'use client';

import { useEffect, useState } from 'react';
import connectBack from '../../../services/connectBack.js';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [carrinho, setCarrinho] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    const userSalvo = JSON.parse(localStorage.getItem('user'));
    if (!userSalvo) {
      router.push('/login');
      return;
    }
    setCarrinho(carrinhoSalvo);
    setUser(userSalvo);
  }, [router]);

  const subtotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );
  const pontosGanhos = Math.floor(subtotal);

  const finalizarCompra = () => {
    const itensFormatados = carrinho.map((item) => ({
      id_produto: item.id,
      quantidade: item.quantidade,
      preco_unitario: item.preco,
    }));

    connectBack
      .post(
        '/pedidos',
        { itens: itensFormatados },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .then(() => {
        localStorage.removeItem('carrinho');
        alert('Pedido realizado com sucesso!');
        router.push('/client/minhaconta');
      })
      .catch(() => {
        alert('Erro ao finalizar o pedido!');
      });
  };

  if (!carrinho.length) {
    return (
      <div className="container">
        <div className="alert alert-warning mt-4">
          Carrinho vazio. <a href="/client/cardapio">Voltar ao cardápio</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h1>Resumo do Pedido</h1>
      <ul className="list-group mb-3">
        {carrinho.map((item) => (
          <li key={`${item.id}-${item.sabor}`} className="list-group-item">
            {item.nome_cardapio} {item.sabor && `(${item.sabor})`} -{' '}
            {item.quantidade}x R$ {item.preco.toFixed(2)}
          </li>
        ))}
        <li className="list-group-item d-flex justify-content-between">
          <strong>Total</strong>
          <strong>R$ {subtotal.toFixed(2)}</strong>
        </li>
      </ul>

      <div className="alert alert-info">
        Você ganhará <strong>{pontosGanhos}</strong> BreadCoin com esse pedido.
      </div>

      <button className="btn btn-success w-100" onClick={finalizarCompra}>
        Confirmar Pedido
      </button>
    </div>
  );
}
