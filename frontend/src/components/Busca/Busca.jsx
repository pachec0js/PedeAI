'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Você pode criar um CSS específico para ele se precisar, ex: import './Busca.css';

export default function Busca() {
  const [termoBusca, setTermoBusca] = useState('');
  const router = useRouter();

  const handleBuscaSubmit = (e) => {
    // Previne o comportamento padrão do formulário, que é recarregar a página.
    e.preventDefault(); 
    
    // Não faz nada se a busca estiver vazia ou só com espaços.
    if (!termoBusca.trim()) return; 

    // Redireciona para a página de busca com o termo como um query parameter 'q'.
    // O encodeURIComponent garante que caracteres especiais sejam tratados corretamente na URL.
    router.push(`/client/busca?q=${encodeURIComponent(termoBusca)}`);
  };

  return (
    <form className="d-flex search-bar" onSubmit={handleBuscaSubmit}>
      <div className="input-group">
        <input
          className="form-control"
          type="search"
          placeholder="Buscar produto..."
          aria-label="Buscar produto"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        />
        <button className="btn nav-btn" type="submit">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>
  );
}