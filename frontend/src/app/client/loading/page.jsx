'use client';

import Loader from '@/components/Loader/Loader';
import { useEffect, useState } from 'react';

export default function PaginaComLoading() {
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const carregar = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100000)); // espera 10 segundos
      setCarregado(true);
    };

    carregar();
  }, []);

  if (!carregado) return <Loader />; // evita renderizar conteúdo enquanto "carregando"

  return (
    <>
      <div className="container mt-5 text-center">
        <h1>Conteúdo carregado com sucesso!</h1>
        <p>Agora você pode ver esta parte da página após 10 segundos.</p>
      </div>
    </>
  );
}
