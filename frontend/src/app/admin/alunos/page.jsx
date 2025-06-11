'use client';

import React, { useEffect, useState } from 'react';
import connectBack from '../../../services/connectBack';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import './alunos.css';

export default function AlunosAdminPage() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/client/login');
      return;
    }

    connectBack.get('/alunos', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setAlunos(res.data);
      })
      .catch(err => {
        console.error("Erro ao buscar alunos:", err);
        toast.error("Erro ao carregar lista de alunos.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <header>
        <title>PedeAI | Dashboard</title>
      </header>
      <style type="text/css">
        {`.alunos a { color: var(--vermelho-escuro) !important; font-weight: bold; }`}
      </style>
      <div className="container-fluid my-4">
        <h1 className="display-6 fw-bold mb-4">Alunos Cadastrados</h1>

        {alunos.length === 0 ? (
          <div className="alert alert-info">Nenhum aluno encontrado.</div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
            {alunos.map(aluno => (
              <div className="col" key={aluno.ra}>
                <div className="card h-100 shadow-sm text-center card-aluno">
                  <img
                    src={aluno.foto}
                    className="card-img-top foto-aluno"
                    alt={`Foto de ${aluno.nome}`}
                  />
                  <div className="card-body">
                    <h5 className="card-title nome-aluno">{aluno.nome}</h5>
                    <p className="card-text text-muted mb-1">RA: {aluno.ra}</p>
                    <p className="card-text text-muted">Turma: {aluno.turma}</p>
                  </div>
                  <div className="card-footer card-footer-pontos">
                    <img src="/imgs/icons/Coins.png" alt="BreadCoins" className="coin-icon" />
                    <strong>{aluno.pontos}</strong> Pontos
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}