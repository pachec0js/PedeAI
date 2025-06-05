'use client';

import { useEffect, useState } from 'react';
import './Nav.css';
import MenuItemLink from '../CardapioLink/CardapioLink';
import { cardapioLinksData } from '@/utils/constants';
import connectBack from '../../services/connectBack.js';

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

    if (offcanvasInstance) {
      offcanvasInstance.hide();
    }

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
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/client">
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Cardápio
                </a>
                <ul className="dropdown-menu">
                  {cardapioLinksData.map((link) => (
                    <MenuItemLink
                      key={link.label}
                      href={link.href}
                      label={link.label}
                      linkClassName="dropdown-item"
                    />
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/client/meuspedidos">
                  Meus pedidos
                </a>
              </li>
            </ul>

            <form className="d-flex search-bar">
              <div className="input-group">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn nav-btn" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>

            <div className="d-flex gap-3 ms-3 nav-icons">
              <a href="/client/carrinho">
                <i className="bi bi-cart-fill"></i>
              </a>
              <a href="/client/contato">
                <i className="bi bi-telephone-fill"></i>
              </a>
              {isLogged ? (
                <a
                  href="#"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                >
                  <i className="bi bi-person-fill"></i>
                </a>
              ) : (
                <a href="/client/login">
                  <i className="bi bi-person-fill"></i>
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Offcanvas da conta */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            {user?.ra ? `RA: ${user.ra}` : 'Minha Conta'}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body text-center">
          <img
            src={`/imgs/alunos/${primeiroNome}.png`}
            alt="Foto"
            className="rounded-circle mb-3"
            width={100}
            height={100}
            onError={(e) => (e.target.src = 'https://placehold.co/100x100')}
          />
          <h6>{user?.nome}</h6>
          <p>
            <strong> BreadCoin:</strong> {breadCoin}
          </p>

          <a
            href="/client/meuspedidos"
            className="btn btn-danger w-100 d-flex justify-content-between align-items-center"
          >
            Ver meus pedidos <i className="bi bi-arrow-right"></i>
          </a>
          <button className="btn btn-danger mt-3" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
