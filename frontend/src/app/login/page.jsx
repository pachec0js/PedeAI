'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdm, loginAluno } from '../../services/auth';

export default function Login() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  // Verifica se já está logado
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      alert('Você já está logado!');
      if (user.tipo === 'adm') {
        router.push('/dashboard');
      } else {
        router.push('/cardapio');
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    // Tenta login ADM
    try {
      const { token, user } = await loginAdm({ login, senha });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/dashboard');
      return;
    } catch (err) {
      console.log('Não é ADM, tentando aluno...');
    }

    // Tenta login Aluno
    try {
      const { token, user } = await loginAluno({ login, senha });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/cardapio');
    } catch (err) {
      setErro('Login ou senha inválidos');
    }
  };

  return (
    <>
      <header>
        <title>PedeAI | Login</title>
      </header>
      <div className="container mt-5">
        <h1 className="mb-4">Login</h1>

        {erro && <div className="alert alert-danger">{erro}</div>}

        <form onSubmit={handleSubmit} className="card p-4">
          <input
            className="form-control mb-3"
            placeholder="RA ou NID"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <input
            className="form-control mb-3"
            placeholder="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button className="btn btn-primary w-100">Entrar</button>
        </form>
      </div>
    </>
  );
}
