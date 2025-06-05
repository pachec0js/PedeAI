'use client';

import { useEffect, useState } from 'react';
import connectBack from '../../../services/connectBack.js';
import { useRouter } from 'next/navigation';

export default function MeusPedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    connectBack
      .get('/pedidos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPedidos(res.data);
      })
      .catch(() => {
        alert('Erro ao buscar pedidos');
      });
  }, [router]);

  const statusFinalizados = ['pronto', 'entregue', 'cancelado'];

  const pedidosPendentes = pedidos.filter(
    (p) => !statusFinalizados.includes(p.estatus)
  );

  const pedidosFinalizados = pedidos.filter((p) =>
    statusFinalizados.includes(p.estatus)
  );

  const calcularTotal = (itens) => {
    return itens.reduce(
      (total, item) => total + Number(item.preco_unitario) * item.quantidade,
      0
    );
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Meus Pedidos</h1>

      {/* 🚩 Pendentes */}
      <h4>Pedidos Pendentes</h4>
      {pedidosPendentes.length === 0 ? (
        <div className="alert alert-info">Nenhum pedido pendente.</div>
      ) : (
        pedidosPendentes.map((p) => (
          <div className="card mb-3" key={p.id}>
            <div className="card-body">
              <h5 className="card-title">
                Pedido #{p.id} -{' '}
                <span className="badge bg-warning text-dark">
                  {p.estatus.toUpperCase()}
                </span>
              </h5>
              <p>
                <strong>Data:</strong>{' '}
                {new Date(p.data_pedido).toLocaleString()}
              </p>

              <h6>Itens:</h6>
              <ul className="list-group mb-3">
                {p.itens.map((item) => (
                  <li
                    key={`${item.id}-${item.sabor}`}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <div>
                      {item.nome_cardapio}{' '}
                      {item.sabor && <small>({item.sabor})</small>} -{' '}
                      {item.quantidade}x
                    </div>
                    <div>
                      R${' '}
                      {(Number(item.preco_unitario) * item.quantidade).toFixed(
                        2
                      )}
                    </div>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Total</strong>
                  <strong>R$ {calcularTotal(p.itens).toFixed(2)}</strong>
                </li>
              </ul>
            </div>
          </div>
        ))
      )}

      <hr />

      {/* ✅ Finalizados */}
      <h4>Pedidos Finalizados</h4>
      {pedidosFinalizados.length === 0 ? (
        <div className="alert alert-info">Nenhum pedido finalizado.</div>
      ) : (
        pedidosFinalizados.map((p) => (
          <div className="card mb-3" key={p.id}>
            <div className="card-body">
              <h5 className="card-title">
                Pedido #{p.id} -{' '}
                <span
                  className={`badge ${
                    p.estatus === 'cancelado' ? 'bg-danger' : 'bg-success'
                  }`}
                >
                  {p.estatus.toUpperCase()}
                </span>
              </h5>
              <p>
                <strong>Data:</strong>{' '}
                {new Date(p.data_pedido).toLocaleString()}
              </p>

              <h6>Itens:</h6>
              <ul className="list-group mb-3">
                {p.itens.map((item) => (
                  <li
                    key={`${item.id}-${item.sabor}`}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <div>
                      {item.nome_cardapio}{' '}
                      {item.sabor && <small>({item.sabor})</small>} -{' '}
                      {item.quantidade}x
                    </div>
                    <div>
                      R${' '}
                      {(Number(item.preco_unitario) * item.quantidade).toFixed(
                        2
                      )}
                    </div>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Total</strong>
                  <strong>R$ {calcularTotal(p.itens).toFixed(2)}</strong>
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
