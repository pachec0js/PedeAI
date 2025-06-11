"use client";

import './CardProduto.css';

export default function CardProduto({ nome, imagem, peso, preco, onClick, disabled }) {
    return (
        <div className={`card-produto ${disabled ? 'indisponivel' : ''} h-100`}>
            <img
                src={imagem}
                alt={nome}
                className="imagem-produto"
            />
            <div className="card-conteudo">
                <h4 className="nome-produto">{nome}</h4>
                {peso && <p className="peso-produto">{peso}</p>}
                <p className="preco-produto laranja">{preco}</p>
                <button className="botao-icone laranja" onClick={onClick} disabled={disabled}>
                    <span className="texto-compre">{disabled ? 'Indisponível' : 'Compre agora'}</span>
                    <i className="bi bi-arrow-right-circle seta-icon"></i>
                </button>
            </div>
        </div>
    );
}
