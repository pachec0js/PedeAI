import Link from 'next/link';
import './Footer.css';
import MenuItemLink from '../CardapioLink/CardapioLink';
import { cardapioLinksData } from '@/utils/constants';

export default function FooterClient() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row text-white justify-content-between">

          {/* Coluna 1 - Logo e Frase */}
          <div className="col-md-3 mb-4 text-center text-md-start d-flex flex-column align-items-center align-items-md-start">
            <img src="/imgs/logo/logo.png" alt="Logo Pede Ai" className="logo mb-2" />
            <h2 className="fw-bold">PEDE AI!</h2>
          </div>

          {/* Coluna 2 - Navegação */}
          <div className="col-md-2 mb-4 text-center text-md-start">
            <h5 className="fw-bold">NAVEGAÇÃO</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/client" className="link">Home</Link>
              </li>
              <li className="mb-2">
                <Link href="/client/contato" className="link">Contato</Link>
              </li>
              <li className="mb-2">
                <Link href="/client/carrinho" className="link">Carrinho</Link>
              </li>
              <li className="mb-2">
                <Link href="/client/meuspedidos" className="link">Meus pedidos</Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Cardápio */}
          <div className="col-md-2 mb-4 text-center text-md-start">
            <h5 className="fw-bold">CARDÁPIO</h5>
            <ul className="list-unstyled">
              {cardapioLinksData.map((link) => (
                <MenuItemLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  itemClassName="mb-2"
                  linkClassName="link"
                />
              ))}
            </ul>
          </div>

          {/* Coluna 4 - Busca */}
          <div className="col-md-4 mb-4 text-center text-md-start">
            <h5 className="upper fw-bold">ESTÁ PROCURANDO ALGO?</h5>
            <p>Busque o que te completa!</p>
            <form className="d-flex search-bar">
              <div className="input-group w-100">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Buscar..."
                  aria-label="Search"
                />
                <button className="btn nav-btn" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Contatos */}
        <div className="row text-white align-items-center text-center text-md-start mb-3">
          <div className="col-md-4 mb-2">
            <i className="bi bi-geo-alt-fill me-2"></i>
            Cantina Escolar – Bloco A
          </div>
          <div className="col-md-4 mb-2">
            <i className="bi bi-envelope-fill me-2"></i>
            contato@pedeai.com
          </div>
          <div className="col-md-4 mb-2">
            <i className="bi bi-telephone-fill me-2"></i>
            (11) 7777-7777
          </div>
        </div>

        {/* Linha divisória */}
        <hr className="hr" />

        {/* Direitos autorais */}
        <div className="text-center">
          <p className="mb-0">
            Copyright © 2025 PedeAI | Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
