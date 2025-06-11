"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import connectBack from '../../../services/connectBack.js';
import './carrinho.css';
import Loader from '@/components/Loader/Loader.jsx';

export default function CarrinhoPage() {
  const [carrinho, setCarrinho] = useState([]);
  const [breadCoin, setBreadCoin] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    const aluno = JSON.parse(localStorage.getItem('user'));

    const carrinhoAgrupado = [];

    carrinhoSalvo.forEach((item) => {
      const existente = carrinhoAgrupado.find(
        (p) => p.id === item.id && p.sabor === item.sabor && p.observacao === item.observacao
      );
      if (existente) {
        existente.quantidade += item.quantidade || 1;
      } else {
        carrinhoAgrupado.push({ ...item, quantidade: item.quantidade || 1 });
      }
    });

    setCarrinho(carrinhoAgrupado);

    if (aluno?.ra) {
      connectBack
        .get(`/pontos/${aluno.ra}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((res) => setBreadCoin(res.data.pontos))
        .catch(() => setBreadCoin(0))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  const subtotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  const pontosGanhos = Math.floor(subtotal);

  const alterarQuantidade = (id, sabor, observacao, delta) => {
    const novoCarrinho = carrinho.map((item) => {
      if (item.id === id && item.sabor === sabor && item.observacao === observacao) {
        const novaQtd = Math.max(1, item.quantidade + delta);
        return { ...item, quantidade: novaQtd };
      }
      return item;
    });
    setCarrinho(novoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  };

  const removerItem = (id, sabor, observacao) => {
    const novoCarrinho = carrinho.filter(
      (item) => !(item.id === id && item.sabor === sabor && item.observacao === observacao)
    );
    setCarrinho(novoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  };

  const limparCarrinho = () => {
    setCarrinho([]);
    localStorage.removeItem('carrinho');
  };

  function removerAcentos(palavra) {
    return palavra
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '');
  }

  return (
    <>
      <header>
        <title>PedeAI | Meu carrinho</title>
      </header>
      <style type="text/css">
        {`
          .carrinho {
            color: var(--vermelho-goiaba) !important;
            font-weight: bold;
          }
        `}
      </style>
      <div className="container carrinho-page mb-5">
        <h1 className="titulo">
          Meu pedido <i className="bi bi-cart-fill"></i>
        </h1>

        {carrinho.length === 0 ? (
          <div className="alert alert-warning vazio">
            Seu carrinho está vazio. <Link href="/client/cardapio">Ir para o cardápio</Link>
          </div>
        ) : (
          <div className="conteudo">
            <div className="esquerda">
              <div className="produtos-header">
                <h4>Produtos</h4>
                <button onClick={limparCarrinho} className="limpar">
                  Limpar
                </button>
              </div>

              {carrinho.map((item, index) => (
                <div className="produto" key={`${item.id}-${item.sabor}-${item.observacao}-${index}`}>
                  <img
                    src={`/imgs/paginas/${removerAcentos(item.nome_cardapio).toLowerCase()}.png`}
                    alt={item.nome_cardapio}
                  />
                  <div className="info">
                    <h5>
                      {item.nome_cardapio} {item.sabor && `(${item.sabor})`}
                    </h5>
                    {item.observacao && (
                        <p className="observacao-carrinho">
                            Obs: {item.observacao}
                        </p>
                    )}
                    <p>R$ {item.preco.toFixed(2)}</p>
                    <button
                      className="remover"
                      onClick={() => removerItem(item.id, item.sabor, item.observacao)}
                    >
                      Remover <i className="bi bi-trash3-fill"></i>
                    </button>
                  </div>

                  <div className="quantidade">
                    <button
                      onClick={() => alterarQuantidade(item.id, item.sabor, item.observacao, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantidade}</span>
                    <button
                      onClick={() => alterarQuantidade(item.id, item.sabor, item.observacao, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="direita">
              <div className="breadcoin">
                <h5>
                  <img src="/imgs/icons/YellowCoins.png" alt="coin" width={24} /> BreadCoin
                </h5>
                <hr />
                <p>
                  <strong>Pontos acumulados:</strong> {breadCoin} Breadcoins
                </p>
                <p>
                  <strong>Pontos adicionais:</strong> {pontosGanhos} Breadcoins
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

              <button className="botao" onClick={() => router.push('/client/checkout')}>
                Próximo
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}