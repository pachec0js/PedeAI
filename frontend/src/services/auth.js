import connectBack from './connectBack';

export const loginAdm = async ({ login, senha }) => {
  const response = await connectBack.post('/auth/login', { nid: login, senha });
  return response.data;
};

export const loginAluno = async ({ login, senha }) => {
  const response = await connectBack.post('/auth/login-aluno', {
    login,
    senha,
  });
  return response.data;
};
