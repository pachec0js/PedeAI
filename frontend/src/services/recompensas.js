import connectBack from './conectBack';

export const listarRecompensas = async () => {
  const response = await connectBack.get('/recompensas');
  return response.data;
};

export const criarRecompensa = async (dados) => {
  const response = await connectBack.post('/recompensas', dados);
  return response.data;
};

export const atualizarRecompensa = async (id, dados) => {
  const response = await connectBack.put(`/recompensas/${id}`, dados);
  return response.data;
};

export const deletarRecompensa = async (id) => {
  const response = await connectBack.delete(`/recompensas/${id}`);
  return response.data;
};
