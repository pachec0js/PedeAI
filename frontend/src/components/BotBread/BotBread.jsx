"use client";

import { useState, useEffect, useRef } from "react";
import './BotBread.css';

export default function BotBread() {
  const [mensagem, setMensagem] = useState("");
  const [conversa, setConversa] = useState([
    { remetente: "bot", texto: "Olá! Eu sou o Bread ✨ Posso te ajudar com alguma dúvida sobre a cantina?" },
  ]);
  const [carregando, setCarregando] = useState(false);
  
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversa]);

  const enviarMensagem = async () => {
    if (!mensagem.trim()) return;

    const historicoUsuario = [...conversa, { remetente: "usuario", texto: mensagem }];
    setConversa(historicoUsuario);
    setMensagem("");
    setCarregando(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      
      const res = await fetch(`${apiUrl}/bread`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ historico: historicoUsuario }),
      });

      if (!res.ok) {
        throw new Error('Falha na resposta da API');
      }

      const data = await res.json();

      setConversa((prev) => [
        ...prev,
        { remetente: "bot", texto: data.resposta || "Desculpe, não entendi a resposta." },
      ]);
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      setConversa((prev) => [
        ...prev,
        { remetente: "bot", texto: "Ops! Ocorreu um erro de comunicação. Por favor, tente novamente." },
      ]);
    }

    setCarregando(false);
  };

  return (
    <>
      <button
        className="botbread-btn"
        data-bs-toggle="modal"
        data-bs-target="#chatModal"
      >
        <img src="/imgs/mascote/breadbot.png" alt="Bot Bread" />
      </button>

      <div
        className="modal fade"
        id="chatModal"
        tabIndex="-1"
        aria-labelledby="chatModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header bg-warning text-white">
              <h4 className="modal-title" id="chatModalLabel">
                <img src="/imgs/mascote/breadbot.png" width="30" className="me-2" alt="Ícone BreadBot"/>
                BreadBot - Assistente da Cantina
              </h4>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body botbread-chat" ref={chatContainerRef}>
              {conversa.map((msg, i) => (
                <div key={i} className={`mensagem ${msg.remetente}`}>
                  {msg.texto.split('\n').map((linha, index) => (
                    <span key={index}>{linha}<br/></span>
                  ))}
                </div>
              ))}
              {carregando && (
                <div className="mensagem bot">
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Digitando...</span>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <input
                type="text"
                className="form-control"
                placeholder="Digite sua mensagem..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !carregando && enviarMensagem()}
                disabled={carregando}
              />
              <button className="text-white btn btn-warning" onClick={enviarMensagem} disabled={carregando}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}