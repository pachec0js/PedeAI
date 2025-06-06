'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import connectBack from '../../../services/connectBack.js';
import './carrinho.css';

export default function CarrinhoPage() {
  const [carrinho, setCarrinho] = useState([]);
  const [breadCoin, setBreadCoin] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    const aluno = JSON.parse(localStorage.getItem('user'));

    setCarrinho(carrinhoSalvo);

    if (aluno?.ra) {
      connectBack
        .get(`/pontos/${aluno.ra}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((res) => setBreadCoin(res.data.pontos))
        .catch(() => setBreadCoin(0));
    }
  }, []);

  const subtotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  const pontosGanhos = Math.floor(subtotal);

  const alterarQuantidade = (id, sabor, delta) => {
    const novoCarrinho = carrinho.map((item) => {
      if (item.id === id && item.sabor === sabor) {
        const novaQtd = Math.max(1, item.quantidade + delta);
        return { ...item, quantidade: novaQtd };
      }
      return item;
    });
    setCarrinho(novoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  };

  const removerItem = (id, sabor) => {
    const novoCarrinho = carrinho.filter(
      (item) => !(item.id === id && item.sabor === sabor)
    );
    setCarrinho(novoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  };

  const limparCarrinho = () => {
    setCarrinho([]);
    localStorage.removeItem('carrinho');
  };

  return (
    <div className="container carrinho-page mb-5">
      <h1 className="titulo">
        Meu pedido <i className="bi bi-cart-fill"></i>
      </h1>

      {carrinho.length === 0 ? (
        <div className="alert alert-warning vazio">
          Seu carrinho está vazio.{' '}
          <Link href="/client/cardapio">Ir para o cardápio</Link>
        </div>
      ) : (
        <div className="conteudo">
          {/* Lado Esquerdo */}
          <div className="esquerda">
            <div className="produtos-header">
              <h4>Produtos</h4>
              <button onClick={limparCarrinho} className="limpar">
                Limpar
              </button>
            </div>

            {carrinho.map((item) => (
              <div className="produto" key={`${item.id}-${item.sabor}`}>
                <img
                  src={`/imgs/paginas/${item.nome_cardapio.toLowerCase()}.png`}
                  alt={item.nome_cardapio}
                  onError={(e) => (e.target.src = 'https://placehold.co/80x80')}
                />
                <div className="info">
                  <h5>{item.nome_cardapio}</h5>
                  <p>R$ {item.preco.toFixed(2)}</p>
                  <button className='remover' onClick={() => removerItem(item.id, item.sabor)}>Remover <i className="bi bi-trash3-fill"></i></button>
                </div>

                <div className="quantidade">
                  <button onClick={() => alterarQuantidade(item.id, item.sabor, -1)}>-</button>
                  <span>{item.quantidade}</span>
                  <button onClick={() => alterarQuantidade(item.id, item.sabor, 1)}>+</button>
                </div>
              </div>
            ))}
          </div>

          {/* Lado Direito */}
          <div className="direita">
            <div className="breadcoin">
              <h5>
                <img src="/imgs/icons/YellowCoins.png" alt="coin" width={24} /> BreadCoin
              </h5>
              <hr />
              <p>
                <strong>Pontos acumulados:</strong> {breadCoin} C
              </p>
              <p>
                <strong>Pontos adicionais:</strong> {pontosGanhos} C
              </p>
            </div>

            <div className="total">
              <p>
                <span>Subtotal</span>
                <strong>R$ {subtotal.toFixed(2)}</strong>
              </p>
              <p className="final">
                <strong>Total</strong>
                <strong className="valor">R$ {subtotal.toFixed(2)}</strong>
              </p>
            </div>

            <button
              className="botao"
              onClick={() => router.push('/client/checkout')}
            >
              Próximo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
