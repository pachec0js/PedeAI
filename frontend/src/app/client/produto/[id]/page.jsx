'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import connectBack from '../../../../services/connectBack.js';
import CardProduto from '@/components/CardProduto/CardProduto';
import './produto.css';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader/Loader.jsx';

export default function ProdutoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [produto, setProduto] = useState(null);
  const [sabores, setSabores] = useState([]);
  const [saborSelecionado, setSaborSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [observacao, setObservacao] = useState('');
  const [produtosRecomendados, setProdutosRecomendados] = useState([]);

  const formatarNome = (nome) => {
    return nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');
  };

  useEffect(() => {
    connectBack
      .get(`/produtos/${id}`)
      .then((res) => {
        const produtoData = res.data;
        setProduto(produtoData);
        setSaborSelecionado(produtoData.sabor || '');
        return connectBack.get(
          `/produtos/sabores/${produtoData.nome_cardapio}`
        );
      })
      .then((res) => {
        setSabores(res.data);
        return connectBack.get('/produtos');
      })
      .then((res) => {
        const recomendados = res.data
          .filter((p) => p.nome_cardapio !== produto?.nome_cardapio)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        setProdutosRecomendados(recomendados);
      })
      .catch(() => {
        router.push('/client/404');
      });
  }, [id, router]);

  if (!produto) return <Loader />;

  const descricao =
    sabores.length > 1
      ? sabores.find((s) => s.sabor === saborSelecionado)?.descricao
      : produto.descricao;

  const preco = Number(produto.preco) * quantidade;
  const adicionarAoCarrinho = () => {
    const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];

    const item = {
      id: produto.id,
      nome_cardapio: produto.nome_cardapio,
      sabor: saborSelecionado,
      quantidade,
      preco: Number(produto.preco),
      observacao: observacao.trim(),
    };

    carrinhoAtual.push(item);
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
    toast.success(<a href="/client/carrinho" className='text-decoration-none text-light'>Produto adicionado ao carrinho</a>)
  };

  return (
    <div className="container produto-page">
      <div className="row mb-5">
        {/* Lado Esquerdo */}
        <div className="col-md-6">
          <img
            src={`/imgs/paginas/${formatarNome(produto.nome_cardapio)}.png`}
            alt={produto.nome_cardapio}
            className="img-produto"
            onError={(e) => (e.target.src = 'https://placehold.co/500x500')}
          />

          <div className="d-flex align-items-center justify-content-between mt-3">
            <div className="quantidade-selector">
              <button
                onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
              >
                -
              </button>
              <span>{quantidade}</span>
              <button onClick={() => setQuantidade(quantidade + 1)}>+</button>
            </div>
            <h3 className="preco-produto">R$ {preco.toFixed(2)}</h3>
          </div>

          <button
            className="btn-add-carrinho mt-4"
            onClick={adicionarAoCarrinho}
          >
            Adicionar ao carrinho <i className="bi bi-cart-fill"></i>
          </button>
        </div>

        {/* Lado Direito */}
        <div className="col-md-6 text-center align-items-center d-flex flex-column">
          {sabores.length > 1 && (
            <>
              <h1 className="escolher-produto mt-3 mb-2">Escolha seu sabor</h1>
              <div className="sabores">
                {sabores.map((s) => (
                  <div
                    key={s.id}
                    className={`sabor ${
                      s.sabor === saborSelecionado ? 'ativo' : ''
                    }`}
                    onClick={() => setSaborSelecionado(s.sabor)}
                  >
                    <img
                      src={`/imgs/opcoes/${
                        formatarNome(produto.nome_cardapio) +
                        formatarNome(s.sabor)
                      }.png`}
                      alt={s.sabor}
                    />
                    <p>{s.sabor}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          <p className="descricao-produto">{descricao}</p>

          <div className="coin-card">
            <img src="/imgs/icons/Coins.png" alt="coin" />
            <span>BreadCoins</span>
            <div className="coin-box">
              <img src="/imgs/icons/flecha.png" alt="" />
              <h5>{Math.floor(preco)} pontos</h5>
            </div>
          </div>

          <h3 className="title-personaliza mt-4 mb-2">
            Personalize seu produto
          </h3>
          <p className="texto-secundario">
            Escreva aqui algo que você queira remover do produto
          </p>
          <textarea
            className="personaliza form-control mb-3"
            placeholder="Ex: Sem cebola, sem molho..."
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          />
          <button className="btn-personalizar" onClick={adicionarAoCarrinho}>
            Enviar
          </button>
        </div>
      </div>

      <div className="mb-5">
        <h1 className="proximo-sabor mb-2">
          <span className="barra-vermelha">Descubra seu próximo sabor</span>
        </h1>
        <p className="texto-secundario">
          Desfrute das melhores combinações feitas pra você
        </p>

        <div className="cards-container d-flex flex-wrap">
          {produtosRecomendados.map((p) => (
            <CardProduto
              key={p.id}
              nome={p.nome_cardapio}
              preco={Number(p.preco).toFixed(2)}
              imagem={`/imgs/paginas/${formatarNome(p.nome_cardapio)}.png`}
              onClick={() => (window.location.href = `/client/produto/${p.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
