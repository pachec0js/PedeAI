"use client";

import { useEffect, useState } from 'react';
import connectBack from '@/services/connectBack';
import CardProduto from '@/components/CardProduto/CardProduto';
import './lojadepontos.css';
import Loader from '@/components/Loader/Loader';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function LojaDePontos() {
  const [user, setUser] = useState(null);
  const [pontos, setPontos] = useState(0);
  const [recompensas, setRecompensas] = useState([]);
  const [resgatando, setResgatando] = useState(null);
  const [horario, setHorario] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const horariosDisponiveis = ['09:40', '12:30', '15:00'];
  const dataHoje = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('user'));
    setUser(usuario);

    if (usuario?.ra) {
      const token = localStorage.getItem('token');
      Promise.all([
        connectBack.get(`/pontos/${usuario.ra}`, { headers: { Authorization: `Bearer ${token}` } }),
        connectBack.get('/recompensas', { headers: { Authorization: `Bearer ${token}` } })
      ])
        .then(([pontosRes, recompensasRes]) => {
          setPontos(pontosRes.data.pontos);
          setRecompensas(recompensasRes.data);
        })
        .catch(() => {
          setPontos(0);
          setRecompensas([]);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const confirmarResgate = (recompensa) => {
    if (!user?.ra || !horario) {
      toast.warn('Por favor, escolha um horário de retirada.');
      return;
    }

    const token = localStorage.getItem('token');
    connectBack
      .post('/trocas', {
        ra_aluno: user.ra,
        id_recompensa: recompensa.id,
        pontos_gastos: recompensa.pontos_necessarios,
        agendamento: `${dataHoje} ${horario}:00`,
      }, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        toast.success('Recompensa resgatada com sucesso!');
        setPontos((p) => p - recompensa.pontos_necessarios);
        setResgatando(null);
        setHorario('');
      })
      .catch(() => toast.error('Erro ao resgatar. Verifique seus pontos e tente novamente.'));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <header>
        <title>PedeAI | Loja de pontos</title>
      </header>
      <style type="text/css">
        {`.lojapontos { color: var(--vermelho-goiaba) !important; font-weight: bold; }`}
      </style>
      <div className="conteudo">
        <img src="/imgs/BannerPc/pontospage.png" alt="Banner desktop" className="d-none d-md-block w-100" />
        <img src="/imgs/BannerMobile/pontospage.png" alt="Banner mobile" className="d-block d-md-none w-100" />

        <div className="container d-flex flex-column flex-md-row justify-content-md-between align-items-center mt-4 mb-4 text-center text-md-start">
          <div className="loja-pontos-titulo mb-3 mb-md-0">
            <h1 className="barra-vermelha">
              Loja de pontos
              <p className="sub-title-pontos">Troque pontos pelos nossos combos</p>
            </h1>
          </div>
          <div className="breadcoins">
            <div className="coin-card">
              <img src="/imgs/icons/Coins.png" alt="coin" />
              <span>BreadCoins</span>
              <div className="coin-box">
                <img src="/imgs/icons/flecha.png" alt="" />
                <h5>{pontos} pontos</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {recompensas.map((r) => {
              const podeResgatar = pontos >= r.pontos_necessarios;
              return (
                <div className="col" key={r.id}>
                  <CardProduto
                    nome={r.nome}
                    imagem={`/imgs/combos/${r.imagem_url || `combo${r.id}.png`}`}
                    preco={`${r.pontos_necessarios} pontos`}
                    onClick={() => podeResgatar ? setResgatando(r) : toast.error('Você não tem pontos suficientes!')}
                    disabled={!podeResgatar}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {resgatando && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmar resgate</h5>
                  <button type="button" className="btn-close" onClick={() => setResgatando(null)}></button>
                </div>
                <div className="modal-body">
                  <p>
                    Deseja resgatar o combo <strong>{resgatando.nome}</strong> por{' '}
                    <strong>{resgatando.pontos_necessarios} BreadCoins</strong>?
                  </p>
                  <div className="form-group mb-3">
                    <label className="form-label">Escolha o horário de retirada para hoje ({new Date().toLocaleDateString('pt-BR')}):</label>
                    <select
                      className="form-select mt-2"
                      value={horario}
                      onChange={(e) => setHorario(e.target.value)}
                    >
                      <option value="">Selecione um horário</option>
                      {horariosDisponiveis.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setResgatando(null)}>
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => confirmarResgate(resgatando)}
                    disabled={!horario}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
}