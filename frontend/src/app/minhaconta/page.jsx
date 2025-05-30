'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MinhaConta() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      alert('⚠️ Você não está logado. Faça o login para acessar sua conta.');
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null; // Evita piscar a tela antes de redirecionar

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Minha Conta</h1>
      <div className="card p-4">
        <p>
          <strong>Nome:</strong> {user.nome}
        </p>
        {user.ra && (
          <p>
            <strong>RA:</strong> {user.ra}
          </p>
        )}
        {user.nid && (
          <p>
            <strong>NID:</strong> {user.nid}
          </p>
        )}
        <p>
          <strong>Tipo de usuário:</strong>{' '}
          {user.tipo === 'adm' ? 'Administrador' : 'Aluno'}
        </p>

        <button className="btn btn-danger mt-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
