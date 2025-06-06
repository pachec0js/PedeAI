'use client';

import './CardProduto.css';

export default function CardProduto({ nome, imagem, peso, preco, onClick }) {
    return (
        <div className="card-produto">
            <img
                src={imagem}
                alt={nome}
                className="imagem-produto"
                onError={(e) => (e.target.src = 'https://placehold.co/300x200?text=Imagem')}
            />
            <div className="card-conteudo">
                <h4 className="nome-produto">{nome}</h4>
                {peso && <p className="peso-produto">{peso}</p>}
                <p className="preco-produto laranja">R$ {preco}</p>
                <button className="botao-icone laranja" onClick={onClick}>
                    <span className="texto-compre">Compre agora</span>
                    <i className="bi bi-arrow-right-circle seta-icon"></i>
                </button>
            </div>
        </div>
    );
}
