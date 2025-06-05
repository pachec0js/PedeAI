'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import connectBack from '../../../services/connectBack.js';

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
    <div className="container my-4">
      <h1 className="mb-4">
        Meu pedido <i className="bi bi-cart-fill"></i>
      </h1>

      {carrinho.length === 0 ? (
        <div className="alert alert-warning">
          Seu carrinho está vazio.{' '}
          <Link href="/client/cardapio">Ir para o cardápio</Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <div className="d-flex justify-content-between mb-3">
              <h4>Produtos</h4>
              <button
                onClick={limparCarrinho}
                className="btn btn-link text-danger"
              >
                Limpar
              </button>
            </div>

            {carrinho.map((item) => (
              <div className="card mb-3" key={`${item.id}-${item.sabor}`}>
                <div className="card-body d-flex align-items-center gap-3">
                  <img
                    src={`/imgs/produtos/${item.nome_cardapio.toLowerCase()}.png`}
                    alt={item.nome_cardapio}
                    width={80}
                    height={80}
                    className="rounded"
                    onError={(e) =>
                      (e.target.src = 'https://placehold.co/80x80')
                    }
                  />
                  <div className="flex-grow-1">
                    <h5 className="mb-1">
                      {item.nome_cardapio}{' '}
                      {item.sabor && <small>({item.sabor})</small>}
                    </h5>
                    <p className="mb-1">R$ {item.preco.toFixed(2)}</p>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          alterarQuantidade(item.id, item.sabor, -1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantidade}</span>
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() =>
                          alterarQuantidade(item.id, item.sabor, 1)
                        }
                      >
                        +
                      </button>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => removerItem(item.id, item.sabor)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <div className="card p-3">
              <h5 className="mb-3">
                <img src="https://placehold.co/50" alt="" /> BreadCoin
              </h5>

              <div className="alert alert-success">
                <strong>Pontos atuais:</strong> {breadCoin} <br />
                <strong>Você irá ganhar:</strong> {pontosGanhos} BreadCoin
              </div>

              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Subtotal</span>
                  <strong>R$ {subtotal.toFixed(2)}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total</span>
                  <strong className="text-danger">
                    R$ {subtotal.toFixed(2)}
                  </strong>
                </li>
              </ul>

              <button
                className="btn btn-warning w-100"
                onClick={() => router.push('/client/checkout')}
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
