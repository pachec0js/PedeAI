'use client';

import React, { useEffect, useState } from 'react';
import connectBack from '../../../services/connectBack';
import { toast } from 'react-toastify';
import './cardapio.css';

export default function CardapioAdminPage() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [produtoAtual, setProdutoAtual] = useState({
        id: null, nome: '', nome_cardapio: '', sabor: '', preco: '', estoque: '', categoria: 'Salgados', descricao: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    function fetchProdutos() {
        setLoading(true);
        const token = localStorage.getItem('token');
        connectBack.get('/produtos/admin', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setProdutos(res.data))
            .catch(err => toast.error("Erro ao carregar cardápio."))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchProdutos();
    }, []);

    const handleOpenCreateModal = () => {
        setIsEditing(false);
        setProdutoAtual({ id: null, nome: '', nome_cardapio: '', sabor: '', preco: '', estoque: '', categoria: 'Salgados', descricao: '' });
        setShowModal(true);
    };

    const handleOpenEditModal = (produto) => {
        setIsEditing(true);
        setProdutoAtual(produto);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Você tem certeza que deseja deletar este produto?")) {
            const token = localStorage.getItem('token');
            connectBack.delete(`/produtos/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                .then(() => {
                    toast.success("Produto deletado com sucesso!");
                    fetchProdutos();
                })
                .catch(err => toast.error("Erro ao deletar produto. Verifique se ele não está em um pedido existente."));
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setProdutoAtual(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const token = localStorage.getItem('token');

        const promise = isEditing
            ? connectBack.put(`/produtos/${produtoAtual.id}`, produtoAtual, { headers: { Authorization: `Bearer ${token}` } })
            : connectBack.post('/produtos', produtoAtual, { headers: { Authorization: `Bearer ${token}` } });

        promise.then(() => {
            toast.success(`Produto ${isEditing ? 'atualizado' : 'criado'} com sucesso!`);
            setShowModal(false);
            fetchProdutos();
        }).catch(err => {
            toast.error(`Erro ao ${isEditing ? 'atualizar' : 'criar'} produto.`);
        }).finally(() => {
            setIsSubmitting(false);
        });
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
                {`.cardapio a { color: var(--vermelho-escuro) !important; font-weight: bold; }`}
            </style>
            <div className="container-fluid my-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="display-6 fw-bold">Gerenciamento de Cardápio</h1>
                    <button className="btn btn-warning" onClick={handleOpenCreateModal}>
                        <i className="bi bi-plus-circle me-2"></i>Adicionar Produto
                    </button>
                </div>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {produtos.map(produto => (
                        <div className="col" key={produto.id}>
                            <div className="card h-100 shadow-sm card-gerenciamento">
                                <div className="card-body">
                                    <h5 className="card-title">{produto.nome}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{produto.nome_cardapio} {produto.sabor && `(${produto.sabor})`}</h6>
                                    <p className="card-text">
                                        <strong>Categoria:</strong> {produto.categoria}<br />
                                        <strong>Preço:</strong> R$ {parseFloat(produto.preco).toFixed(2)}<br />
                                        <strong>Estoque:</strong> {produto.estoque}
                                    </p>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <button className="btn btn-sm btn-outline-warning" onClick={() => handleOpenEditModal(produto)}>
                                        <i className="bi bi-pencil-fill"></i> Editar
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(produto.id)}>
                                        <i className="bi bi-trash-fill"></i> Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <>
                        <div className="modal show d-block" tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered modal-lg">
                                <div className="modal-content">
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="modal-header">
                                            <h5 className="modal-title">{isEditing ? `Editar Produto #${produtoAtual.id}` : 'Criar Novo Produto'}</h5>
                                            <button type="button" className="btn-close" disabled={isSubmitting} onClick={() => setShowModal(false)}></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="nome" className="form-label">Nome Completo (Ex: Coxinha de Frango)</label>
                                                    <input type="text" className="form-control" id="nome" name="nome" value={produtoAtual.nome} onChange={handleFormChange} required disabled={isSubmitting} />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="nome_cardapio" className="form-label">Nome de Agrupamento (Ex: Coxinha)</label>
                                                    <input type="text" className="form-control" id="nome_cardapio" name="nome_cardapio" value={produtoAtual.nome_cardapio} onChange={handleFormChange} required disabled={isSubmitting} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="sabor" className="form-label">Sabor/Variação (Ex: Frango)</label>
                                                    <input type="text" className="form-control" id="sabor" name="sabor" value={produtoAtual.sabor} onChange={handleFormChange} disabled={isSubmitting} />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="categoria" className="form-label">Categoria</label>
                                                    <select className="form-select" id="categoria" name="categoria" value={produtoAtual.categoria} onChange={handleFormChange} required disabled={isSubmitting}>
                                                        <option value="Salgados">Salgados</option>
                                                        <option value="Doces">Doces</option>
                                                        <option value="Bebidas">Bebidas</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="preco" className="form-label">Preço (Ex: 5.50)</label>
                                                    <input type="number" step="0.01" className="form-control" id="preco" name="preco" value={produtoAtual.preco} onChange={handleFormChange} required disabled={isSubmitting} />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="estoque" className="form-label">Estoque</label>
                                                    <input type="number" step="1" className="form-control" id="estoque" name="estoque" value={produtoAtual.estoque} onChange={handleFormChange} required disabled={isSubmitting} />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="descricao" className="form-label">Descrição</label>
                                                <textarea className="form-control" id="descricao" name="descricao" rows="3" value={produtoAtual.descricao} onChange={handleFormChange} disabled={isSubmitting}></textarea>
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
                        <div className="modal-backdrop fade show"></div>
                    </>
                )}
            </div>
        </>
    );
}