'use client';

import { useEffect, useState } from 'react';
import './Nav.css';
import MenuItemLink from '../CardapioLink/CardapioLink';
import { cardapioLinksData } from '@/utils/constants';
import connectBack from '../../services/connectBack.js';
import Perfil from '../perfil/perfil';
import Busca from '../Busca/Busca'; // 1. IMPORTAR O NOVO COMPONENTE

export default function NavClient() {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [breadCoin, setBreadCoin] = useState(0);

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    setIsLogged(!!userLocal);
    setUser(userLocal);

    if (userLocal?.ra) {
      connectBack
        .get(`/pontos/${userLocal.ra}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => setBreadCoin(res.data.pontos))
        .catch(() => setBreadCoin(0));
    }
  }, []);

  const primeiroNome = user?.nome
    ?.split(' ')[0]
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const handleLogout = () => {
    const offcanvasElement = document.getElementById('offcanvasRight');
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (offcanvasInstance) offcanvasInstance.hide();

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/client/login';
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <img src="/imgs/logo/logo.png" alt="Logo" className="logo-navbar" />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link home" href="/client">Home</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle cardapio" href="#" data-bs-toggle="dropdown">
                  Cardápio
                </a>
                <ul className="dropdown-menu">
                  {cardapioLinksData.map((link) => (
                    <MenuItemLink key={link.label} href={link.href} label={link.label} linkClassName="dropdown-item" />
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link meuspedidos" href="/client/meuspedidos">Meus pedidos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link lojapontos" href="/client/lojadepontos">Loja de pontos</a>
              </li>
            </ul>

            {/* 2. SUBSTITUIR O FORMULÁRIO ANTIGO PELO NOVO COMPONENTE */}
            <Busca />

            <div className="d-flex gap-3 ms-3 nav-icons">
              <a href="/client/carrinho"><i className="bi bi-cart-fill carrinho"></i></a>
              <a href="/client/contato"><i className="bi bi-telephone-fill contato"></i></a>
              <a href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight">
                <i className="bi bi-person-fill"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Offcanvas */}
      {user && (
        <Perfil
          user={user}
          breadCoin={breadCoin}
          primeiroNome={primeiroNome}
          handleLogout={handleLogout}
        />
      )}
    </>
  );
}