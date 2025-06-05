'use client';

import { useEffect, useState } from 'react';
import connectBack from '../../../services/connectBack.js';
import CardProduto from '@/components/CardProduto/CardProduto.jsx';
import './cardapio.css'

export default function Cardapio() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        connectBack.get('/produtos').then((res) => {
            const agrupados = res.data.filter((item, index, self) =>
                index === self.findIndex((t) => t.nome_cardapio === item.nome_cardapio)
            );
            setProdutos(agrupados);
        });
    }, []);

    function formatarNome(nome_cardapio) {
        return nome_cardapio
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '');
    }

    return (
        <div className="container">
            <h1 className="mb-4">Cardápio Geral</h1>
            <div className="cards-container row">
                {produtos.map((p) => (
                    <div className="col-3" key={p.id}>
                        <CardProduto
                            nome={p.nome_cardapio || p.nome}
                            imagem={`/imgs/paginas/${formatarNome(p.nome_cardapio)}.png`}
                            preco={Number(p.preco).toFixed(2)}
                            onClick={() => window.location.href = `/client/produto/${p.id}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
