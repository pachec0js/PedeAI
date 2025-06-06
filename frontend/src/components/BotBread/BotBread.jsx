'use client';

import { useEffect, useState } from 'react';
import './BotBread.css';

export default function BotBread() {
  // const [visivel, setVisivel] = useState(false);

  // useEffect(() => {
  //   // Função que verifica a posição da rolagem da página
  //   const handleScroll = () => {
  //     // Se o usuário rolou mais de 300px para baixo, mostra o botão
  //     setVisivel(window.scrollY > 300);
  //   };

  //   // Adiciona o evento de rolagem quando o componente for carregado
  //   window.addEventListener('scroll', handleScroll);

  //   return () => window.removeEventListener('scroll', handleScroll); // Remove o evento quando o componente for desmontado (boa prática)
  // }, []);

  const irParaTopo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // visivel && (
    <button
      onClick={irParaTopo}
      className="btn-voltar-topo btn btn-danger rounded-circle shadow"
    >
      <i className="bi bi-arrow-up-short fs-3"></i>
    </button>
  );
  // );
}
