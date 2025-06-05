'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import CardProduto from '@/components/CardProduto/CardProduto';

import './home.css';

export default function Home() {
  return (
    <main>
      <div className="banner principal">
        <div className="banner overflow-hidden">
          {/* Banner para desktop */}
          <img
            src="/imgs/BannerPc/home.png"
            alt="Banner desktop"
            className="d-none d-md-block w-100"
          />

          {/* Banner para mobile */}
          <img
            src="/imgs/BannerMobile/home.png"
            alt="Banner mobile"
            className="d-block d-md-none w-100"
          />
        </div>
      </div>

      <div className="destaques-container">
        <div className="icones-section">
          {/* Salgados */}
          <div className="icone-card">
            <i className="bi bi-fork-knife icone"></i> {/* Adicionado "icone" aqui */}
            <h3 className="titulo">Salgados</h3>
            <p className="descricao">
              Delícias quentinhas e crocantes para matar sua fome a qualquer
              hora.
            </p>
          </div>

          {/* Doces */}
          <div className="icone-card">
            <i className="bi bi-cake2 icone"></i> {/* Adicionado "icone" aqui */}
            <h3 className="titulo">Doces</h3>
            <p className="descricao">
              Sabores que adoçam seu dia com receitas clássicas e irresistíveis.
            </p>
          </div>

          {/* Bebidas */}
          <div className="icone-card">
            <i className="bi bi-cup-straw icone"></i>
            <h3 className="titulo">Bebidas</h3>
            <p className="descricao">
              Sucos, refrigerantes e mais para refrescar e acompanhar seu
              lanche.
            </p>
          </div>
        </div>


        <div className="mais-vendidos">
          <div className="container">
            <h2 className="mais-vendidos-titulo">
              <span className="barra-vermelha">Mais vendidos</span>
            </h2>
            <p className="subtitulo">Produtos mais procurados no PedeAI</p>
          </div>
        </div>

        <div className="cards-container">
          <CardProduto
            nome="Coxinha"
            imagem="/imgs/paginas/coxinha.png"
            peso="100 g"
            preco="6,50"
            onClick={() => window.location.href = '/client/produto/1'}
          />

          <CardProduto
            nome="Carolina"
            imagem="/imgs/paginas/carolina.png"
            peso="100 g"
            preco="6,50"
            onClick={() => window.location.href = '/client/produto/2'}
          />

          <CardProduto
            nome="Refrigerante"
            imagem="/imgs/paginas/refrigerante.png"
            peso="350 ml"
            preco="6,50"
            onClick={() => window.location.href = '/client/produto/3'}
          />
        </div>
      </div>

      <div className="pontos">
        <div className="banner overflow-hidden">
          {/* Banner para desktop */}
          <img
            src="/imgs/BannerPc/pontos.png"
            alt="Banner desktop"
            className="d-none d-md-block w-100"
          />

          {/* Banner para mobile */}
          <img
            src="/imgs/BannerMobile/pontos.png"
            alt="Banner mobile"
            className="d-block d-md-none w-100"
          />
        </div>
      </div>
      <div className="container">
        <div className="mais-vendidos">
          <h2 className="mais-vendidos-titulo">
            <span className="barra-vermelha">Novidades</span>
          </h2>
          <p className="subtitulo">Produtos mais novos no PedeAI</p>
        </div>
      </div>
      <div className="bannerempada container mb-4">
        <div className="banner mt-5 ">
          {/* Banner para desktop */}
          <img
            src="/imgs/BannerPc/novidadeEmpada.png"
            alt="Banner desktop"
            className="img-fluid d-none d-md-block w-100 rounded-5"
          />

          {/* Banner para mobile */}
          <img
            src="/imgs/BannerMobile/novidadeEmpada.png"
            alt="Banner mobile"
            className="img-fluid d-block d-md-none w-100 rounded-5"
          />
        </div>
      </div>

      <div className="bannercoxinha container mb-4">
        <div className="banner mt-5 ">
          {/* Banner para desktop */}
          <img
            src="/imgs/BannerPc/novidadeCoxinha.png"
            alt="Banner desktop"
            className="img-fluid d-none d-md-block w-100 rounded-5"
          />

          {/* Banner para mobile */}
          <img
            src="/imgs/BannerMobile/novidadeCoxinha.png"
            alt="Banner mobile"
            className="img-fluid d-block d-md-none w-100 rounded-5"
          />
        </div>
      </div>

      <div className="sobre-nos container my-5 p-3 rounded-4 d-flex flex-column flex-md-row align-items-center gap-4">
        <img
          src="/imgs/BannerMobile/sobre.png"
          alt="Banner Pede Ai"
          className="img-sobre img-fluid rounded-4"
        />

        <div className="texto-sobre">
          <h2 className="titulo-sobre">
            <span className="borda-vermelha">Conheça quem somos…</span>
            <br />
            <small className="fs-6 text-muted">
              somos sabor, praticidade e cuidado em cada detalhe.
            </small>
          </h2>

          <p className="texto">
            O Pede Aí é o site oficial da nossa cantina escolar, criado para facilitar o seu acesso ao cardápio,
            fazer pedidos com mais agilidade e ainda aproveitar um sistema de pontos que recompensa suas escolhas.
            <br />
            <br />
            Aqui, você encontra salgados fresquinhos, doces irresistíveis, bebidas geladinhas e até folhados especiais — tudo
            preparado com carinho e atenção à qualidade.
            <br />
            <br />
            Além disso, a cada compra, você acumula pontos que viram descontos reais em pedidos futuros.
          </p>

          <p className="texto">
            Pensamos em cada detalhe para tornar sua experiência mais prática, rápida e vantajosa, seja no recreio ou na hora
            da fome.
            <br />
            Pede Aí e aproveite o melhor da cantina, onde o sabor e a inovação se encontram!
          </p>
        </div>
      </div>

    </main>
  );
}
