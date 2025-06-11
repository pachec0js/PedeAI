'use client';
import '../cardapio.css';
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

  function formatarCategoria(categoria) {
    return categoria
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

    connectBack
      .get('/produtos')
      .then((res) => {
        const filtrados = res.data.filter(
          (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
        );

        const agrupados = filtrados.filter(
          (item, index, self) =>
            index ===
            self.findIndex((t) => t.nome_cardapio === item.nome_cardapio)
        );

        setProdutos(agrupados);
      })
      .finally(() => setCarregando(false));
  }, [categoria, router]);

  if (carregando) return <p>Carregando...</p>;

  return (<>
    <header>
        <title>PedeAI | Cardápio</title>
      </header>
      <style type="text/css">
        {`
          .cardapio {
            color: var(--vermelho-goiaba) !important;
            font-weight: bold;
          }
        `}
      </style>
    <div className="conteudo">
      <div className="banner principal">
        <div className="banner overflow-hidden">
          {/* Banner para desktop */}
          <img
            src={`/imgs/cardapio/banner${formatarCategoria(categoria)}.png`}
            alt="Banner desktop"
            className="d-none d-md-block w-100"
          />

          {/* Banner para mobile */}
          <img
            src={`/imgs/cardapio/mobile${formatarCategoria(categoria)}.png`}
            alt="Banner mobile"
            className="d-block d-md-none w-100"
          />
        </div>
      </div>

      <div className="container">
        <h2 className="mais-vendidos-titulo mt-5 mb-5">
          <span className="barra-vermelha">{categoria}</span>
        </h2>
      </div>

      {produtos.length === 0 ? (
        <div className="alert alert-warning text-center">
          <strong>Ops!</strong> Nenhum produto encontrado na categoria{' '}
          <strong>{categoria}</strong>.
        </div>
      ) : (
        <div className="conteudo">
          {/* Conteúdo */}
          <div className="cards-container row">
            {produtos.map((p) => (
              <div className="col-3 prod-card" key={p.id}>
                <CardProduto
                  nome={p.nome_cardapio || p.nome}
                  imagem={`/imgs/paginas/${formatarNome(p.nome_cardapio)}.png`}
                  preco={Number(p.preco).toFixed(2)}
                  onClick={() =>
                    (window.location.href = `/client/produto/${p.id}`)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
}
