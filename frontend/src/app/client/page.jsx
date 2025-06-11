'use client';

import { toast } from 'react-toastify';
import { useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import CardProduto from '@/components/CardProduto/CardProduto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger } from '@fortawesome/free-solid-svg-icons';

import './home.css';

export default function Home() {

    useEffect(() => {
    const toastMessage = localStorage.getItem('toastMessage');
    if (toastMessage) {
      toast.success(toastMessage);
      localStorage.removeItem('toastMessage');
    }
  }, []);

  return (
    <>
    <header>
        <title>PedeAI | Home</title>
      </header>
      <style type="text/css">
        {`
          .home {
            color: var(--vermelho-goiaba) !important;
            font-weight: bold;
          }
        `}
      </style>
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
          <div className="icone-card">
            <Link href="/client/cardapio/Salgados" className="link">
              i<FontAwesomeIcon icon={faBurger} className="icone burguer" />
            </Link>
            <h3 className="titulo">Salgados</h3>
            <p className="descricao">
              Delícias quentinhas e crocantes para matar sua fome a qualquer
              hora.
            </p>
          </div>

          <div className="icone-card">
            <Link href="/client/cardapio/Doces" className="link">
              <i className="bi bi-cake2-fill icone"></i>
            </Link>
            <h3 className="titulo">Doces</h3>
            <p className="descricao">
              Sabores que adoçam seu dia com receitas clássicas e irresistíveis.
            </p>
          </div>

          <div className="icone-card">
            <Link href="/client/cardapio/Bebidas" className="link">
              <i className="bi bi-cup-hot-fill icone"></i>
            </Link>
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
            onClick={() => (window.location.href = '/client/produto/1')}
          />

          <CardProduto
            nome="Carolina"
            imagem="/imgs/paginas/carolina.png"
            peso="100 g"
            preco="6,50"
            onClick={() => (window.location.href = '/client/produto/2')}
          />

          <CardProduto
            nome="Refrigerante"
            imagem="/imgs/paginas/refrigerante.png"
            peso="350 ml"
            preco="6,50"
            onClick={() => (window.location.href = '/client/produto/3')}
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
      <div className="bannerempada banner-novi container mb-4">
        <a href="">
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
        </a>
      </div>

      <div className="bannercoxinha banner-novi container mb-4">
        <a href="">
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
        </a>
      </div>

      <div className="sobre-nos container my-5 p-3 rounded-4 d-flex flex-column flex-md-row align-items-center gap-4">
        <img
          src="/imgs/BannerMobile/sobre.png"
          alt="Banner Pede Ai"
          className="img-sobre img-fluid rounded-4"
        />

        <div className="texto-sobre">
          <h2 className="titulo-sobre">
            <span className="borda-vermelha">Quem somos?</span>
            <br />
            
            <p className=" fs-5 text-muted">
              Somos sabor, praticidade e cuidado em cada detalhe.
             
            </p>
          </h2>

          <p className="texto">
             <br />
           A PedeAI é uma empresa prestadora de serviços especializada em cantinas virtuais escolares, criada para modernizar e facilitar o dia a dia de alunos, responsáveis e gestores escolares. Unimos praticidade e tecnologia para transformar a forma como os pedidos são realizados e administrados no ambiente escolar.
 <br />
  <br />
Nosso nome carrega o que somos: "Pede", da ação de pedir algo, e "AI", referência à inteligência artificial que impulsiona nosso sistema, por meio do Bread, nosso simpático chatbot em formato de pão. Ele oferece suporte automático e humanizado, ajudando os usuários com dúvidas sobre o cardápio, formas de pagamento, prazos de entrega e muito mais.
 <br />
  <br />
Com uma interface intuitiva e funcional, a PedeAI permite que alunos façam pedidos com facilidade, enquanto administradores contam com um painel completo para gerenciar pedidos, visualizar métricas como receita total, itens vendidos, e os produtos mais populares — tudo em tempo real.
 <br />
  <br />
Acreditamos em soluções inteligentes, acessíveis e acolhedoras, que otimizem a rotina escolar e ofereçam uma nova forma de se conectar com a alimentação no ambiente educacional.
          </p>
        </div>
      </div>
    </main>
    </>
  );
}
