"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import connectBack from "../../../services/connectBack.js";
import { toast } from 'react-toastify';
import "./checkout.css";

export default function CheckoutPage() {
  const [carrinho, setCarrinho] = useState([]);
  const [user, setUser] = useState(null);
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [formaSelecionada, setFormaSelecionada] = useState("");

  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);

  const [mostrarQrCode, setMostrarQrCode] = useState(false);
  const [qrTimeout, setQrTimeout] = useState(10);

  const [cartao, setCartao] = useState({
    numero: "",
    cvv: "",
    validade: ""
  });

  const router = useRouter();

  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem("carrinho")) || [];
    const userSalvo = JSON.parse(localStorage.getItem("user"));
    if (!userSalvo || carrinhoSalvo.length === 0) {
      router.push("/client/carrinho");
      return;
    }
    setCarrinho(carrinhoSalvo);
    setUser(userSalvo);
    setData(new Date().toISOString().split("T")[0]);
  }, [router]);

  useEffect(() => {
    let timer;
    if (mostrarQrCode) {
      timer = setInterval(() => {
        setQrTimeout((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setPagamentoConfirmado(true);
            setMostrarQrCode(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mostrarQrCode]);

  const subtotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );
  const pontosGanhos = Math.floor(subtotal);

  const handleConfirmarMetodo = () => {
    if (formaSelecionada === 'cartao') {
      if (!cartao.numero || !cartao.cvv || !cartao.validade) {
        alert("Preencha todos os dados do cartão!");
        return;
      }
      setPagamentoConfirmado(true);
    } else if (formaSelecionada === 'lanchonete') {
      setPagamentoConfirmado(true);
    } else if (formaSelecionada === 'pix') {
      setMostrarQrCode(true);
      setQrTimeout(10);
    }
  };

  const finalizarCompra = () => {
    if (!pagamentoConfirmado || !horario || !data) {
      alert("Por favor, selecione o horário e confirme o pagamento.");
      return;
    }

    const itensFormatados = carrinho.map((item) => ({
      id_produto: item.id,
      quantidade: item.quantidade,
      preco_unitario: item.preco,
      observacao: item.observacao || ''
    }));

    connectBack
      .post(
        "/pedidos",
        {
          itens: itensFormatados,
          data_retirada: data,
          horario_retirada: horario,
          forma_pagamento: formaSelecionada,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        localStorage.removeItem("carrinho");
        toast.success(<a href="/client/carrinho" className='text-decoration-none text-light'>Pedido finalizado com sucesso!</a>)
        router.push("/client/meuspedidos");
      })
      .catch(() => {
        alert("Erro ao finalizar o pedido!");
      });
  };

  const botoesPagamento = [
    { valor: "cartao", label: "Cartão", icon: "credit-card" },
    { valor: "pix", label: "Pix", icon: "qr-code" },
    { valor: "lanchonete", label: "Na Retirada", icon: "shop" },
  ];

  const horariosAgendamento = ["09:40", "12:30", "15:00"];

  return (
    <>
      <header>
        <title>PedeAI | Checkout</title>
        <style type="text/css">{`.observacao-checkout { display: block; font-size: 0.8rem; color: #6c757d; font-style: italic; margin-left: 10px; }`}</style>
      </header>
      <div className="row checkout-layout">
        <div className="agendamento-card col-md-5">
          <h4>Agendamento <i className="bi bi-calendar-event"></i></h4>
          <label>Data</label>
          <input type="date" readOnly value={data} />
          <label>Horários</label>
          <div className="horarios">
            {horariosAgendamento.map((h) => (
              <button key={h} className={`btn-horario ${horario === h ? "ativo" : ""}`} onClick={() => setHorario(h)}>
                {h}h
              </button>
            ))}
          </div>
        </div>

        <div className="resumo-card col-md-5">
          <h4>Resumo do pedido <i className="bi bi-check-circle-fill"></i></h4>
          <ul>
            {carrinho.map((item, index) => (
              <li className="itens-list-pedido" key={`${item.id}-${item.sabor}-${index}`}>
                <div>{item.nome_cardapio} {item.sabor && `(${item.sabor})`} ({item.quantidade}x) <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span></div>
                {item.observacao && <small className="observacao-checkout">Obs: {item.observacao}</small>}
              </li>
            ))}
          </ul>
          <hr />
          <div className="resumo-total">
            <div>Subtotal: <span>R$ {subtotal.toFixed(2)}</span></div>
            <div>BreadCoin: <span>+ {pontosGanhos} C</span></div>
            <div className="total">Total: <strong>R$ {subtotal.toFixed(2)}</strong></div>
          </div>
        </div>

        <div className="col-md-6 pagamento-card">
          <h4>Método de pagamento <i className="bi bi-cash-coin"></i></h4>
          <div className="pagamento-botoes">
            {botoesPagamento.map((b) => (
              <button
                key={b.valor}
                className={`btn-forma ${formaSelecionada === b.valor ? "ativo" : ""}`}
                onClick={() => {
                  setFormaSelecionada(b.valor);
                  setPagamentoConfirmado(false);
                  setMostrarQrCode(false);
                }}
              >
                <i className={`bi bi-${b.icon}`}></i> {b.label}
              </button>
            ))}
          </div>

          {formaSelecionada === "cartao" && !pagamentoConfirmado && (
            <div className="form-cartao mt-3">
              <label>Número do cartão</label>
              <input type="text" placeholder="0000 0000 0000 0000" value={cartao.numero} onChange={(e) => setCartao({ ...cartao, numero: e.target.value })} />
              <label>CVV</label>
              <input type="text" placeholder="CVV" value={cartao.cvv} onChange={(e) => setCartao({ ...cartao, cvv: e.target.value })} />
              <label>Validade</label>
              <input type="text" placeholder="MM/AA" value={cartao.validade} onChange={(e) => setCartao({ ...cartao, validade: e.target.value })} />
            </div>
          )}

          {formaSelecionada && !pagamentoConfirmado && !mostrarQrCode && (
            <button className="btn btn-confirmar-metodo" onClick={handleConfirmarMetodo}>
              Confirmar método de pagamento
            </button>
          )}

          {pagamentoConfirmado && (
            <div className="pago-sucesso">Pagamento confirmado ✅</div>
          )}

          {mostrarQrCode && (
            <div className="qrcode-area">
              <p>Escaneie o QRCode para confirmar</p>
              <img src="/imgs/icons/qrcode.png" width={150} alt="QRCode" />
              <p className="timer">Confirmando em... {qrTimeout}s</p>
            </div>
          )}
        </div>

        <button
          className={`btn-finalizar ${pagamentoConfirmado && horario ? "liberado" : ""}`}
          onClick={finalizarCompra}
          disabled={!pagamentoConfirmado || !horario}
        >
          Confirmar pedido <i className="bi bi-arrow-right-circle"></i>
        </button>
      </div>
    </>
  );
}