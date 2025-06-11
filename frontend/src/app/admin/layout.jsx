'use client';
import './home.css'

export default function AdmLayout({ children }) {

    const handleLogout = () => {
        const offcanvasElement = document.getElementById('offcanvasRight');
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (offcanvasInstance) offcanvasInstance.hide();

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/client/login';
    };

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <img src="/imgs/logo/logoPerfil.png" className='logo' alt="" />
                <ul className="menu">
                    <li className='dashboard-title'><a href="/admin/dashboard"><i className="bi bi-bar-chart-fill"></i> Dashboard</a></li>
                    <li className='pedidos'><a href="/admin/pedidos"><i className="bi bi-clipboard-fill"></i> Pedidos</a></li>
                    <li className='alunos'><a href="/admin/alunos"><i className="bi bi-people-fill"></i> Alunos</a></li>
                    <li className='pontos'><a href="/admin/pontos"><img src="/imgs/icons/RedCoins.png" alt="" /> Pontos</a></li>
                    <li className='cardapio'><a href="/admin/cardapio"><i className="bi bi-gear-fill"></i> Cardápio</a></li>
                    <li className=''><button className='admin-Logout' onClick={handleLogout}><i className="bi bi-door-open-fill"></i> Logout</button></li>
                </ul>
            </aside>
            <main className="main content-pai">
                <main className="p-4">{children}</main>
            </main>
        </div>
    );
}
