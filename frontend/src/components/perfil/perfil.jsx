'use client';

import './perfil.css';

export default function Perfil({ user, breadCoin, primeiroNome, handleLogout }) {
    return (
        <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
        >
            <div className="offcanvas-body">
                <button
                    type="button"
                    className="btn-close custom-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
                <div className="container-perfil">
                    <div className="ra">RA: {user?.ra}</div>

                    <div className="avatar-wrapper">
                        <div className="avatar-border">
                            <img
                                src={`/imgs/alunos/${primeiroNome}.png`}
                                onError={(e) =>
                                    (e.target.src = 'https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg')
                                }
                                alt="Avatar"
                                className="avatar"
                            />
                        </div>
                    </div>

                    <div className="nome">{user?.nome}</div>

                    <hr />

                    <div className="logo-wrapper">
                        <img src="/imgs/logo/logoPerfil.png" alt="Logo da Cantina" className="logo-cantina" />
                    </div>

                    <div className="breadcoins-display">
                        <img
                            src="/imgs/icons/Coins.png"
                            alt="Moeda"
                            className="coin-icon"
                        />
                        <span className="bc-text">BreadCoins</span>
                        <div className="bc-arrow-circle">
                            <span className="bc-arrow">➤</span>
                        </div>
                        <span className="points">{breadCoin} pontos</span>
                    </div>
<div className="buttons-perfil">
                    <a href="/client/meuspedidos">
                        <button className="btn-ver-pedidos">
                            Ver meus pedidos
                            <div className="pedidos-arrow"><span>➤</span></div>
                        </button>
                    </a>

                    <button className='btn-ver-pedidos Logout' onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}





