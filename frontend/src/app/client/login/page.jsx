'use client';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';
import './login.css';

import { loginAdm, loginAluno } from '../../../services/auth.js';

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  // Verifica se já está logado
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      if (user.tipo === 'adm') {
        router.replace('/admin/dashboard');
      } else {
        router.replace('/client/cardapio');
      }
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    // Login ADM
    try {
      const { token, user } = await loginAdm({ login, senha });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      window.location.href = '/admin/dashboard';
      return; // Exit after successful ADM login
    } catch (err) {
      console.log('Não é ADM, tentando aluno...');
    }

    // Login Aluno
    try {
  const { token, user } = await loginAluno({ login, senha });
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('toastMessage', 'Login realizado com sucesso!');
  window.location.href = '/client';
} catch (err) {
  toast.error('RA ou senha inválidos');
  console.error('Aluno login error:', err);
}
  };

  return (
  <>
  <header>
        <title>PedeAI | Login</title>
      </header>
    <div className="login-container">
      <main className="mainContent">
        <div className="illustrationSection">
          <Image
            src="/imgs/mascote/animacaoLogin.png"
            alt=""
            width={500}
            height={500}
          />
        </div>

        <div className="loginFormSection">
          <div className="welcomeMessage">
            <h1>Bem vindo de volta!</h1>
            <p>Bateu a fome? loga ai!</p>
          </div>

          <form onSubmit={handleSubmit} className="loginForm">
            <input
              type="text"
              placeholder="RA"
              className="inputField"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              className="inputField"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button type="submit" className="submitButton">
              <span className='btnTextLogin'>Entrar</span>
              <img className='btnIconLogin' src="/imgs/icons/flechaBranca.png" alt=""/>
            </button>
          </form>
        </div>
      </main>
    </div>
    </>
  );
}
