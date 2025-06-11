'use client';

import React, { useEffect, useState } from 'react';
import connectBack from '../../../services/connectBack';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import './pedidos.css';

export default function PedidosAdminPage() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [pedidoParaEditar, setPedidoParaEditar] = useState(null);
  const [novoStatus, setNovoStatus] = useState('');
  const [pedidoParaDeletar, setPedidoParaDeletar] = useState(null);

  function fetchPedidos() {
    const token = localStorage.getItem('token');
    connectBack.get('/pedidos', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setPedidos(res.data))
      .catch(err => {
        toast.error("Erro ao carregar pedidos. Você pode não ter permissão.");
        router.push('/admin/dashboard');
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handleSalvarStatus = () => {
    if (!pedidoParaEditar || !novoStatus) return;
    const token = localStorage.getItem('token');

    connectBack.put(`/pedidos/${pedidoParaEditar.id}`,
      { estatus: novoStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        toast.success(`Pedido #${pedidoParaEditar.id} atualizado para "${novoStatus}"!`);
        setPedidoParaEditar(null);
        fetchPedidos();
      })
      .catch(err => {
        toast.error("Erro ao atualizar status.");
      });
  };

  const handleConfirmarDelete = () => {
    if (!pedidoParaDeletar) return;
    const token = localStorage.getItem('token');

    connectBack.delete(`/pedidos/${pedidoParaDeletar.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        toast.warn(`Pedido #${pedidoParaDeletar.id} foi deletado.`);
        setPedidoParaDeletar(null);
        fetchPedidos();
      })
      .catch(err => {
        toast.error("Erro ao deletar pedido.");
      });
  };

  const agruparPedidosPorStatus = (status) => {
    return pedidos.filter(p => p.estatus === status);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  const renderizarPedidos = (listaPedidos) => (
    <div className="row">
      {listaPedidos.length === 0 ? (
        <div className="col-12">
          <div className="alert alert-light text-center" role="alert">
            Nenhum pedido nesta categoria no momento.
          </div>
        </div>
      ) : (
        listaPedidos.map(pedido => (
          <div className="col-lg-4 col-md-6 mb-4" key={pedido.id}>
            <div className={`card h-100 shadow-sm card-pedido status-${pedido.estatus}`}>
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Pedido #{pedido.id}</h5>
                <span className={`badge rounded-pill badge-status-${pedido.estatus}`}>{pedido.estatus}</span>
              </div>
              <div className="card-body">
                <p className="mb-1"><strong>Aluno(a):</strong> {pedido.nome_aluno}</p>
                <p className="text-muted small">RA: {pedido.ra_aluno}</p>
                <p><strong>Retirada:</strong> {new Date(pedido.data_retirada).toLocaleDateString('pt-BR')} às {pedido.horario_retirada}</p>
                <p><strong>Pagamento:</strong> {pedido.forma_pagamento}</p>
                <hr />
                <strong>Itens do Pedido:</strong>
                <ul className="list-unstyled mt-2">
                  {pedido.itens?.map((item, index) => (
                    item && (
                      <li key={index} className="mb-2">
                        <span className="fw-bold">{item.quantidade}x</span> {item.nome}
                        {item.observacao && <small className="d-block text-secondary fst-italic ps-3">Obs: {item.observacao}</small>}
                      </li>
                    )
                  ))}
                </ul>
              </div>
              <div className="card-footer bg-transparent border-0 text-end py-3">
                <button className="btn btn-sm btn-outline-danger me-2" onClick={() => setPedidoParaDeletar(pedido)}>Cancelar</button>
                <button className="btn btn-sm btn-primary" onClick={() => { setPedidoParaEditar(pedido); setNovoStatus(pedido.estatus); }}>Editar Status</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <>
      <header>
        <title>PedeAI | Dashboard</title>
      </header>
      <style type="text/css">
        {`.pedidos a { color: var(--vermelho-escuro) !important; font-weight: bold; }`}
      </style>
      <div className="container-fluid my-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="display-6 fw-bold">Gerenciamento de Pedidos</h1>
        </div>

        <section className="mb-5">
          <h2 className="pb-2 border-bottom mb-3">🕒 Pedidos Pendentes</h2>
          {renderizarPedidos(agruparPedidosPorStatus('pendente'))}
        </section>

        <section className="mb-5">
          <h2 className="pb-2 border-bottom mb-3">✅ Prontos para Retirada</h2>
          {renderizarPedidos(agruparPedidosPorStatus('pronto'))}
        </section>

        <section className="mb-5">
          <h2 className="pb-2 border-bottom mb-3">🏁 Entregues</h2>
          {renderizarPedidos(agruparPedidosPorStatus('entregue'))}
        </section>

        <section className="mb-5">
          <h2 className="pb-2 border-bottom mb-3">❌ Cancelados</h2>
          {renderizarPedidos(agruparPedidosPorStatus('cancelado'))}
        </section>

        {(pedidoParaEditar || pedidoParaDeletar) && <div className="modal-backdrop fade show"></div>}

        {pedidoParaEditar && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content shadow-lg">
                <div className="modal-header">
                  <h5 className="modal-title">Editar Status do Pedido #{pedidoParaEditar.id}</h5>
                  <button type="button" className="btn-close" onClick={() => setPedidoParaEditar(null)}></button>
                </div>
                <div className="modal-body">
                  <p>Selecione o novo status para o pedido de <strong>{pedidoParaEditar.nome_aluno}</strong>.</p>
                  <select className="form-select" value={novoStatus} onChange={(e) => setNovoStatus(e.target.value)}>
                    <option value="pendente">Pendente</option>
                    <option value="pronto">Pronto</option>
                    <option value="entregue">Entregue</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setPedidoParaEditar(null)}>Fechar</button>
                  <button type="button" className="btn btn-primary" onClick={handleSalvarStatus}>Salvar Alterações</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {pedidoParaDeletar && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content shadow-lg">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmar Cancelamento</h5>
                  <button type="button" className="btn-close" onClick={() => setPedidoParaDeletar(null)}></button>
                </div>
                <div className="modal-body">
                  <p>Você tem certeza que deseja cancelar e deletar o pedido #{pedidoParaDeletar.id} de <strong>{pedidoParaDeletar.nome_aluno}</strong>?</p>
                  <p className="text-danger fw-bold">Esta ação não pode ser desfeita.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setPedidoParaDeletar(null)}>Manter Pedido</button>
                  <button type="button" className="btn btn-danger" onClick={handleConfirmarDelete}>Sim, Cancelar Pedido</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}