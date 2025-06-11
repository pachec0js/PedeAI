'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import connectBack from '../../../services/connectBack.js';
import CardProduto from '@/components/CardProduto/CardProduto';
import './busca.css'

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q');

  const [resultados, setResultados] = useState({ produtos: [], combos: [] });
  const [userPontos, setUserPontos] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      const buscaPromise = connectBack.get(`/produtos/buscar?q=${query}`);
      const pontosPromise = user?.ra 
        ? connectBack.get(`/pontos/${user.ra}`, { headers: { Authorization: `Bearer ${token}` } }) 
        : Promise.resolve({ data: { pontos: 0 } });

      Promise.all([buscaPromise, pontosPromise])
        .then(([buscaRes, pontosRes]) => {
          setResultados({
            produtos: buscaRes.data.produtos || [],
            combos: buscaRes.data.combos || []
          });
          setUserPontos(pontosRes.data.pontos || 0);
        })
        .catch(err => {
          console.error("Erro ao buscar resultados ou pontos:", err);
          setResultados({ produtos: [], combos: [] });
          setUserPontos(0);
        })
        .finally(() => {
          setLoading(false);
        });

    } else {
      setLoading(false);
    }
  }, [query]);

  const handleProductClick = (nomeCardapio) => {
    router.push(`/client/produto/${encodeURIComponent(nomeCardapio)}`);
  };

  const handleComboClick = () => {
    router.push(`/client/lojadepontos`);
  };
   function removerAcentos(palavra) {
    return palavra
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '');
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Buscando...</span>
        </div>
        <p className="mt-2">Buscando por "{query}"...</p>
      </div>
    );
  }

  const totalResultados = resultados.produtos.length + resultados.combos.length;

  return (
    <div>
      <div className='mb-5'>
        {query && totalResultados > 0 ? (
          <h2 className='pesquisa-titulo'>
            <p className='barra-vermelha'>Resultados para: <span className="termo-pesquisado">"{query}"</span></p> 
          </h2>
        ) : (
          <h2 className='pesquisa-titulo'>
            Nenhum resultado encontrado para: <span className="termo-pesquisado">"{query}"</span>
          </h2>
        )}
      </div>

      {resultados.produtos.length > 0 && (
        <section className="mb-5">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {resultados.produtos.map((produto) => (
              <div className="col" key={produto.nome_cardapio}>
                <CardProduto
                  nome={produto.nome_cardapio}
                  imagem={`/imgs/paginas/${removerAcentos(produto.nome_cardapio).toLowerCase()}.png`}
                  preco={`A partir de R$ ${parseFloat(produto.preco).toFixed(2).replace('.', ',')}`}
                   onClick={() =>
                      (window.location.href = `/client/produto/${produto.id}`)
                    }
                  disabled={!produto.disponivel}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {resultados.combos.length > 0 && (
        <section>
          <h2 className='pesquisa-titulo'>
            <p className="barra-vermelha">Combos com: <span className="termo-pesquisado">"{query}"</span></p> 
          </h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {resultados.combos.map((combo) => {
              const podeResgatar = userPontos >= combo.pontos_necessarios;
              return (
                <div className="col" key={combo.id}>
                  <CardProduto
                    nome={combo.nome}
                    imagem={`/imgs/combos/combo${combo.id}.png`}
                    preco={`${combo.pontos_necessarios} pontos`}
                    onClick={handleComboClick}
                    disabled={!podeResgatar}
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

export default function BuscaPage() {
  return (
    <div className="container my-5">
      <Suspense fallback={<div className="text-center">Carregando busca...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}