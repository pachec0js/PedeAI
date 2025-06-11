'use client';

import React, { useEffect, useState } from 'react';
import connectBack from '../../../services/connectBack';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import './pontos.css'

export default function PontosAdminPage() {
  const [recompensas, setRecompensas] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [recompensaAtual, setRecompensaAtual] = useState({ id: null, nome: '', descricao: '', pontos_necessarios: '', imagem_url: null });
  const [imagemArquivo, setImagemArquivo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [recompensaParaDeletar, setRecompensaParaDeletar] = useState(null);

  function fetchRecompensas() {
    setLoading(true);
    const token = localStorage.getItem('token');
    connectBack.get('/recompensas', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setRecompensas(res.data))
      .catch(err => toast.error("Erro ao carregar recompensas."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchRecompensas();
  }, []);

  const handleOpenCreateModal = () => {
    setIsEditing(false);
    setRecompensaAtual({ id: null, nome: '', descricao: '', pontos_necessarios: '', imagem_url: null });
    setImagemArquivo(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (recompensa) => {
    setIsEditing(true);
    setRecompensaAtual(recompensa);
    setImagemArquivo(null);
    setShowModal(true);
  };

  const handleConfirmarDelete = () => {
    if (!recompensaParaDeletar) return;
    const token = localStorage.getItem('token');

    connectBack.delete(`/recompensas/${recompensaParaDeletar.id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        toast.warn(`Combo "${recompensaParaDeletar.nome}" deletado com sucesso!`);
        setRecompensaParaDeletar(null);
        fetchRecompensas();
      })
      .catch(err => {
        toast.error("Erro ao deletar combo.");
        setRecompensaParaDeletar(null);
      });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setRecompensaAtual(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImagemArquivo(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    const token = localStorage.getItem('token');
    const { id, imagem_url, ...dadosTexto } = recompensaAtual;

    try {
      let recompensaId = id;

      if (isEditing) {
        await connectBack.put(`/recompensas/${id}`, dadosTexto, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        const res = await connectBack.post('/recompensas', dadosTexto, { headers: { Authorization: `Bearer ${token}` } });
        recompensaId = res.data.id;
      }

      if (imagemArquivo) {
        const formData = new FormData();
        formData.append('imagem', imagemArquivo);
        await connectBack.post(`/recompensas/imagem/${recompensaId}`, formData, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
      }

      toast.success(`Combo ${isEditing ? 'atualizado' : 'criado'} com sucesso!`);
      setShowModal(false);
      fetchRecompensas();

    } catch (err) {
      toast.error(`Erro ao ${isEditing ? 'atualizar' : 'criar'} combo.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}><div className="spinner-border text-warning" role="status"></div></div>;
  }

  return (
    <>
      <header>
        <title>PedeAI | Dashboard</title>
      </header>
      <style type="text/css">
        {`.pontos a { color: var(--vermelho-escuro) !important; font-weight: bold; }`}
      </style>
      <div className="container-fluid my-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="display-6 fw-bold">Gerenciar Combos (Recompensas)</h1>
          <button className="btn btn-warning" onClick={handleOpenCreateModal}>
            <i className="bi bi-plus-circle me-2"></i>Criar Novo Combo
          </button>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Prévia</th>
                  <th>Nome do Combo</th>
                  <th>Descrição</th>
                  <th className='text-center'>Pontos</th>
                  <th className='text-end'>Ações</th>
                </tr>
              </thead>
              <tbody>
                {recompensas.map(recompensa => (
                  <tr key={recompensa.id}>
                    <td>
                      <img
                        src={recompensa.imagem_url ? `/imgs/combos/${recompensa.imagem_url}` : 'https://placehold.co/60x60?text=S/IMG'}
                        alt={recompensa.nome}
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }}
                      />
                    </td>
                    <td>{recompensa.nome}</td>
                    <td className='recompensa-descricao'>{recompensa.descricao}</td>
                    <td className='text-center'>{recompensa.pontos_necessarios}</td>
                    <td className='text-end'>
                      <button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleOpenEditModal(recompensa)}>Editar</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => setRecompensaParaDeletar(recompensa)}>Deletar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {(showModal || recompensaParaDeletar) && <div className="modal-backdrop fade show"></div>}

        {showModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <form onSubmit={handleFormSubmit}>
                  <div className="modal-header">
                    <h5 className="modal-title">{isEditing ? `Editar Combo #${recompensaAtual.id}` : 'Criar Novo Combo'}</h5>
                    <button type="button" className="btn-close" disabled={isSubmitting} onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="nome" className="form-label">Nome do Combo</label>
                      <input type="text" className="form-control" id="nome" name="nome" value={recompensaAtual.nome} onChange={handleFormChange} required disabled={isSubmitting} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="descricao" className="form-label">Descrição</label>
                      <input type="text" className="form-control" id="descricao" name="descricao" value={recompensaAtual.descricao} onChange={handleFormChange} disabled={isSubmitting} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="pontos_necessarios" className="form-label">Pontos Necessários</label>
                      <input type="number" className="form-control" id="pontos_necessarios" name="pontos_necessarios" value={recompensaAtual.pontos_necessarios} onChange={handleFormChange} required disabled={isSubmitting} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="imagem" className="form-label">Imagem do Combo</label>
                      <input type="file" className="form-control" id="imagem" name="imagem" accept="image/png, image/jpeg, image/gif" onChange={handleImageChange} disabled={isSubmitting} />
                      {isEditing && recompensaAtual.imagem_url && (
                        <small className='d-block mt-2 text-muted'>Imagem atual: {recompensaAtual.imagem_url}. Envie um novo arquivo apenas se quiser substituir.</small>
                      )}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" disabled={isSubmitting} onClick={() => setShowModal(false)}>Cancelar</button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Salvando...' : 'Salvar'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {recompensaParaDeletar && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmar Exclusão</h5>
                  <button type="button" className="btn-close" onClick={() => setRecompensaParaDeletar(null)}></button>
                </div>
                <div className="modal-body">
                  <p>Você tem certeza que deseja deletar o combo?</p>
                  <p className='fw-bold'>"{recompensaParaDeletar.nome}"</p>
                  <p className="text-danger small mt-3">Esta ação não pode ser desfeita.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setRecompensaParaDeletar(null)}>Cancelar</button>
                  <button type="button" className="btn btn-danger" onClick={handleConfirmarDelete}>Sim, Deletar</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}