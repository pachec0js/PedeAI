'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import connectBack from '../../../services/connectBack.js';

export default function Dashboard() {
    const router = useRouter();
    const [data, setData] = useState(null);

    useEffect(() => {
        // Proteção de rotas
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.tipo !== 'adm') {
            router.push('/login');
        } else {
            connectBack.get('/dashboard').then((res) => {
                setData(res.data);
            });
        }
    }, []);

    if (!data) {
        return <p>Carregando dashboard...</p>;
    }

    return (
        <div>
            <h1>Dashboard ADM</h1>
            <table className="table">
                <tbody>
                    <tr>
                        <th>Total de Pedidos</th>
                        <td>{data.totalPedidos}</td>
                    </tr>
                    <tr>
                        <th>Total Vendido</th>
                        <td>R$ {data.totalVendido}</td>
                    </tr>
                </tbody>
            </table>

            <h2>Produtos Mais Vendidos</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    {data.produtosMaisVendidos.map((p) => (
                        <tr key={p.nome}>
                            <td>{p.nome}</td>
                            <td>{p.quantidade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
