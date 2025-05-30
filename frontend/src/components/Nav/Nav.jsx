'use client';

import { useEffect, useState } from 'react';
import './Nav.css';

export default function Nav() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLogged(!!user);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="https://placehold.co/50x50" alt="Logo" />
          </a>
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
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Alimentos
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Salgados
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Bebidas
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Doces
                    </a>
                  </li>
                </ul>
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
              <i className="bi bi-cart-fill"></i>
              <i className="bi bi-telephone-fill"></i>
              <a href={isLogged ? '/minhaconta' : '/login'}>
                <i className="bi bi-person-fill"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
