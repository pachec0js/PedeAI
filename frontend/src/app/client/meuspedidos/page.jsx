"use client";

import { useEffect, useState } from "react";
import connectBack from "../../../services/connectBack";
import { useRouter } from "next/navigation";
import "./meuspedidos.css";
import Loader from "@/components/Loader/Loader";
import { toast } from 'react-toastify';

export default function MeusPedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [trocas, setTrocas] = useState([]);
  const [modalConfirm, setModalConfirm] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [modalCancelar, setModalCancelar] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/client/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [resPedidos, resTrocas] = await Promise.all([
          connectBack.get("/pedidos", { headers: { Authorization: `Bearer ${token}` } }),
          connectBack.get("/trocas", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setPedidos(resPedidos.data);
        setTrocas(resTrocas.data);
      } catch (error) {
        toast.error("Erro ao buscar dados");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const statusFinalizados = ["pronto", "entregue", "cancelado"];

  const pedidosPendentes = pedidos.filter(
    (p) => !statusFinalizados.includes(p.estatus)
  );
  const pedidosFinalizados = pedidos.filter((p) =>
    statusFinalizados.includes(p.estatus)
  );

  const calcularTotal = (itens) => {
    if (!itens) return 0;
    return itens.reduce(
      (total, item) => total + Number(item.preco_unitario) * item.quantidade,
      0
    );
  };

  const formatarData = (data) => {
    const dt = new Date(data);
    return dt.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
    });
  };

  const formatarHora = (data) => {
    const dt = new Date(data);
    return `${dt.getHours().toString().padStart(2, '0')}h${dt.getMinutes().toString().padStart(2, "0")}`;
  };

  const handleRecomprar = (pedido) => {
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
    const novosItens = pedido.itens.map((item) => ({
      id: item.id_produto,
      nome_cardapio: item.nome_cardapio,
      sabor: item.sabor,
      quantidade: item.quantidade,
      preco: item.preco_unitario,
      observacao: item.observacao || "",
    }));

    localStorage.setItem(
      "carrinho",
      JSON.stringify([...carrinhoAtual, ...novosItens])
    );
    setModalConfirm(null);
    toast.success("Itens adicionados ao carrinho com sucesso!");
    router.push('/client/carrinho');
  };

  const handleConfirmarCancelamento = () => {
    if (!modalCancelar) return;
    const token = localStorage.getItem('token');
    connectBack.patch(`/pedidos/${modalCancelar.id}/cancelar`, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        toast.warn("Pedido cancelado.");
        fetchData();
      })
      .catch(err => {
        toast.error(err.response?.data?.message || "Erro ao cancelar pedido.");
      })
      .finally(() => {
        setModalCancelar(null);
      });
  };

  const isCancelamentoPermitido = (pedido) => {
    if (!pedido || pedido.estatus !== 'pendente') return false;
    const [hora, minuto] = pedido.horario_retirada.split('h');
    const dataRetirada = new Date(pedido.data_retirada);
    dataRetirada.setUTCHours(hora, minuto, 0, 0);
    const limiteCancelamento = new Date(dataRetirada.getTime() - 15 * 60 * 1000);
    return new Date() < limiteCancelamento;
  };

  function removerAcentos(palavra) {
    if (typeof palavra !== 'string') {
      return '';
    }
    return palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  if (loading) return <Loader />;

  const temPedidos = pedidos.length > 0;
  const temTrocas = trocas.length > 0;

  return (
    <>
      <header>
        <title>PedeAI | Meus pedidos</title>
      </header>
      <style type="text/css">
        {`.meuspedidos { color: var(--vermelho-goiaba) !important; font-weight: bold; }`}
      </style>

      <div className="container pedidos-page">
        <h1 className="titulo-pedidos">
          Histórico de pedidos <i className="bi bi-hourglass-split"></i>
        </h1>

        {pedidosPendentes.length === 0 && pedidosFinalizados.length === 0 && (
          <div className="alert alert-info">Ainda sem pedidos. <a href="/client/cardapio">Clique aqui</a> para começar!</div>
        )}

        {temPedidos && [...pedidosPendentes, ...pedidosFinalizados].map((pedido) => (
          <div className="card pedido-card" key={pedido.id}>
            <div className="pedido-info-topo">
              <div><strong>Pedido:</strong> <span className="pedido-id">#{pedido.id}</span></div>
              <div><strong>Data:</strong> <span>{formatarData(pedido.data_pedido)} | {formatarHora(pedido.data_pedido)}</span></div>
              <div><strong>Valor total:</strong> <span>R$ {calcularTotal(pedido.itens).toFixed(2)}</span></div>
              <div><strong>Status:</strong> <span className={`status-text status-${pedido.estatus}`}>{pedido.estatus}</span></div>
            </div>
            <hr className="linha-divisoria" />
            <div className="agendamento-info">Retirada agendada para: {formatarData(pedido.data_retirada)} | {pedido.horario_retirada}</div>
            {pedido.itens?.map((item) => (
              <div className="itens-pedido" key={item.id}>
                <img
                  src={`/imgs/paginas/${removerAcentos(item.nome_cardapio || '').toLowerCase()}.png`}
                  alt={item.nome_cardapio}
                  className="img-produto-pedido"
                  onError={(e) => (e.target.src = "https://placehold.co/100x100?text=Produto")}
                />
                <div className="detalhes-item">
                  <div className="nome-produto">
                    {item.nome_cardapio} {item.sabor && <small>({item.sabor})</small>}
                  </div>
                  <div className="obs">{item.observacao || "Sem observações."}</div>
                  <div className="acoes text-decoration-none">
                    <button className="btn btn-link p-0 me-3 text-danger text-decoration-none" onClick={() => setModalConfirm(pedido)}>
                      <i className="bi bi-arrow-repeat"></i> Comprar novamente
                    </button>
                    <a className="pe-none text-decoration-none text-danger">|</a>
                    <a href={`/client/produto/${item.id_produto}`} className="text-decoration-none text-danger">
                      <i className="bi bi-eye-fill"></i> Ver produto
                    </a>
                    {pedido.estatus === 'pendente' && (
                        <>
                            <a className="pe-none text-decoration-none text-danger">|</a>
                            <button className="btn btn-link p-0 ms-3 text-danger text-decoration-none" onClick={() => setModalCancelar(pedido)}>
                                <i className="bi bi-trash-fill"></i> Cancelar pedido
                            </button>
                        </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <h4 className="titulo-trocas">Resgates com BreadCoin <img src="/imgs/icons/RedCoins.png" alt="" /></h4>
        
        {trocas.length === 0 && (
          <div className="alert alert-info mb-5">Parece que você ainda não trocou seus BreadCoins. <a href="/client/lojadepontos">Clique aqui</a> para visitar a loja de pontos!</div>
        )}

        {temTrocas && (
            <>
              {trocas.map((t) => (
                <div className="card pedido-card combo-troca" key={t.id}>
                   <div className="pedido-info-topo">
                    <div><strong>Resgate:</strong> <span className="pedido-id">#{t.id}</span></div>
                    <div><strong>Data:</strong> <span>{formatarData(t.data_troca)} | {formatarHora(t.data_troca)}</span></div>
                    <div><strong>Custo:</strong> <span>{t.pontos_gastos} Pontos</span></div>
                    <div><strong>Status:</strong> Pendente</div>
                  </div>
                  <hr className="linha-divisoria" />
                  <div className="agendamento-info">Retirada agendada para: {formatarData(t.agendamento)} | {formatarHora(t.agendamento)}</div>
                  <div className="combo-conteudo">
                    <img src={`/imgs/combos/combo${t.id_recompensa}.png`} alt="combo" className="img-combo" onError={(e) => (e.target.src = "https://placehold.co/120x120?text=Combo")} />
                    <div>
                      <strong>Combo:</strong> {t.nome_recompensa}
                      <div className="acoes mt-2">
                        <a href="/client/lojadepontos" className="text-decoration-none text-danger"><i className="bi bi-eye-fill"></i> Ver loja de pontos</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

        {modalConfirm && (
          <div className="modal-backdrop-custom modal">
            <div className="modal-confirmacao">
              <h5>Confirmar recompra?</h5>
              <p>Deseja adicionar todos os itens do pedido #{modalConfirm.id} ao seu carrinho novamente?</p>
              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-secondary" onClick={() => setModalConfirm(null)}>Cancelar</button>
                <button className="btn btn-danger" onClick={() => handleRecomprar(modalConfirm)}>Confirmar</button>
              </div>
            </div>
          </div>
        )}

        {modalCancelar && (
          <div className="modal-backdrop-custom modal">
            <div className="modal-confirmacao">
              <h5>Cancelar Pedido</h5>
              <p>Você pode cancelar seu pedido até <strong>15 minutos</strong> antes do horário de retirada.</p>
              <hr/>
              <p>Deseja mesmo cancelar o pedido <strong>#{modalCancelar.id}</strong>?</p>
              {!isCancelamentoPermitido(modalCancelar) && (
                <div className="alert alert-danger small mt-3">Prazo para cancelamento expirado. Não é mais possível cancelar este pedido.</div>
              )}
              <div className="d-flex justify-content-end gap-2 mt-3">
                <button className="btn btn-warning text-white" onClick={() => setModalCancelar(null)}>Voltar</button>
                <button className="btn btn-danger" onClick={handleConfirmarCancelamento} disabled={!isCancelamentoPermitido(modalCancelar)}>Sim, Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}