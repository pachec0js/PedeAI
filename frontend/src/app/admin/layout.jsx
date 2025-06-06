'use client';


export default function AdmLayout({ children }) {

    return (
        <div>
            <nav className="p-3 bg-dark text-white">
                <h2>Área Administrativa</h2>
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link text-white" href="/adm/dashboard">
                            Dashboard
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="/adm/produtos">
                            Produtos
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="/adm/pedidos">
                            Pedidos
                        </a>
                    </li>
                </ul>
            </nav>
            <main className="p-4">{children}</main>
        </div>
    );
}
