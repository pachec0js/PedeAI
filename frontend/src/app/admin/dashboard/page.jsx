'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import connectBack from '../../../services/connectBack';
import './dash.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Title
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip, Title);

export default function Dashboard() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);

  const [dadosGrafico, setDadosGrafico] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!user || user.tipo !== 'adm') {
      router.push('/client/login');
      return;
    }

    connectBack.get('/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        const data = res.data;
        setDashboardData(data);
        if (data.graficoVendasSemana) {
          setDadosGrafico({
            labels: data.graficoVendasSemana.labels,
            datasets: [{
              label: 'Pedidos na Semana',
              data: data.graficoVendasSemana.data,
              backgroundColor: '#FFA446',
              borderColor: '#FF8C00',
              borderWidth: 1
            }]
          });
        }
      })
      .catch(error => {
        console.error("Erro ao buscar dados do dashboard:", error);
      });
  }, [router]);

  if (!dashboardData) {
    return <div className="dashboard-container text-center"><p>Carregando dashboard...</p></div>;
  }

  const totalVendidoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(dashboardData.totalVendido || 0);

  return (
    <>
      <header>
        <title>PedeAI | Dashboard</title>
      </header>
      <style type="text/css">
        {`.dashboard-title a { color: var(--vermelho-escuro) !important; font-weight: bold; }`}
      </style>

      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <div className="cards-row">
          <div className="card-item">
            <p>Receita Total</p>
            <h2>{totalVendidoFormatado}</h2>
            <span className="positivo">no período total</span>
          </div>
          <div className="card-item">
            <p>Total de Pedidos</p>
            <h2>{dashboardData.totalPedidos}</h2>
            <span className="positivo">no período total</span>
          </div>
          <div className="card-item">
            <p>Total de Itens Vendidos</p>
            <h2>{dashboardData.totalItensVendidos}</h2>
            <span className="texto-info">em todos os pedidos</span>
          </div>
          <div className="card-item">
            <p>Clientes Únicos</p>
            <h2>{dashboardData.totalAlunos}</h2>
            <span className="texto-info">que fizeram pedidos</span>
          </div>
        </div>

        <div className="section-row">
          <div className="section-left">
            <h3>Visão Geral dos Pedidos</h3>
            <p>Acompanhe o volume de pedidos realizados nos últimos 7 dias.</p>
            <Bar
              data={dadosGrafico}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: true, text: 'Pedidos nos Últimos 7 Dias' }
                }
              }}
            />
          </div>

          <div className="section-right">
            <h3>Produtos Mais Vendidos</h3>
            <p>Top 5 produtos mais populares entre os alunos.</p>
            <div className="lista-produtos-vendidos">
              {dashboardData.produtosMaisVendidos && dashboardData.produtosMaisVendidos.length > 0 ? (
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Produto</th>
                      <th className='text-end'>Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.produtosMaisVendidos.map((produto, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{produto.nome_cardapio}</td>
                        <td className='text-end'>{produto.quantidade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Não há dados de vendas de produtos ainda.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}