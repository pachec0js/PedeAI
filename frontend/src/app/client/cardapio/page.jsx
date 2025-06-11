'use client';

import { useEffect, useState } from 'react';
import connectBack from '../../../services/connectBack.js';
import CardProduto from '@/components/CardProduto/CardProduto.jsx';
import './cardapio.css';

export default function Cardapio() {
  const [produtos, setProdutos] = useState({
    Salgados: [],
    Doces: [],
    Bebidas: [],
  });

  useEffect(() => {
    connectBack.get('/produtos').then((res) => {
      const agrupados = res.data.filter(
        (item, index, self) =>
          index ===
          self.findIndex((t) => t.nome_cardapio === item.nome_cardapio)
      );

      const separados = {
        Salgados: agrupados.filter((p) => p.categoria === 'Salgados'),
        Doces: agrupados.filter((p) => p.categoria === 'Doces'),
        Bebidas: agrupados.filter((p) => p.categoria === 'Bebidas'),
      };

      setProdutos(separados);
    });
  }, []);

  function formatarNome(nome_cardapio) {
    return nome_cardapio
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '');
  }

  return (
    <>
    <header>
        <title>PedeAI | Cardápio</title>
      </header>
      <style type="text/css">
        {`
          .cardapio {
            color: var(--vermelho-goiaba) !important;
            font-weight: bold;
          }
        `}
      </style>
    <div className="conteudo">
      <div className="banner-principal">
        <div className="banner overflow-hidden">
          <div
            id="carouselExampleAutoplaying"
            className="carousel slide d-none d-md-block w-100"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="/imgs/cardapio/bannerprodutos.png"
                  className="d-block w-100"
                  alt="banner"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/imgs/cardapio/bannersalgados.png"
                  className="d-block w-100"
                  alt="salgados"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/imgs/cardapio/bannerdoces.png"
                  className="d-block w-100"
                  alt="doces"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/imgs/cardapio/bannerbebidas.png"
                  className="d-block w-100"
                  alt="bebidas"
                />
              </div>
            </div>
          </div>

          <div
            id="carouselMobile"
            className="carousel slide d-block d-md-none w-100"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="/imgs/cardapio/mobileprodutos.png"
                  className="d-block w-100"
                  alt="banner"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/imgs/cardapio/mobilesalgados.png"
                  className="d-block w-100"
                  alt="salgados"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/imgs/cardapio/mobiledoces.png"
                  className="d-block w-100"
                  alt="doces"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/imgs/cardapio/mobilebebidas.png"
                  className="d-block w-100"
                  alt="bebidas"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        {['Salgados', 'Doces', 'Bebidas'].map((categoria) => (
          <div key={categoria} className="mb-5">
            <h2 className="mais-vendidos-titulo mb-4">
              <span className="barra-vermelha">{categoria}</span>
            </h2>

            <div className="cards-container row">
              {produtos[categoria].map((p) => (
                <div
                  className="col-6 col-md-4 col-lg-3 mb-4 prod-card"
                  key={p.id}
                >
                  <CardProduto
                    nome={p.nome_cardapio || p.nome}
                    imagem={`/imgs/paginas/${formatarNome(
                      p.nome_cardapio
                    )}.png`}
                    preco={Number(p.preco).toFixed(2)}
                    onClick={() =>
                      (window.location.href = `/client/produto/${p.id}`)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
