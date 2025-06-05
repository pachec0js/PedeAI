'use client';
import '../cardapio.css'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import connectBack from '../../../../services/connectBack';
import CardProduto from '@/components/CardProduto/CardProduto.jsx';

export default function CategoriaPage() {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const { categoria } = useParams();
    const router = useRouter();

    const categoriasValidas = ['Salgados', 'Bebidas', 'Doces'];

    function formatarNome(nome) {
        return nome
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '');
    }

    useEffect(() => {
        if (!categoriasValidas.includes(categoria)) {
            router.push('/404');
            return;
        }

        connectBack.get('/produtos')
            .then((res) => {
                const filtrados = res.data.filter(
                    (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
                );

                const agrupados = filtrados.filter((item, index, self) =>
                    index === self.findIndex((t) => t.nome_cardapio === item.nome_cardapio)
                );

                setProdutos(agrupados);
            })
            .finally(() => setCarregando(false));
    }, [categoria, router]);

    if (carregando) return <p>Carregando...</p>;

    return (
        <div className="container">
            <h1 className="mb-4">Categoria: {categoria}</h1>

            {produtos.length === 0 ? (
                <div className="alert alert-warning text-center">
                    <strong>Ops!</strong> Nenhum produto encontrado na categoria <strong>{categoria}</strong>.
                </div>
            ) : (
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
            )}
        </div>
    );
}
