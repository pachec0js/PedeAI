import connectBack from './conectBack';

export const realizarTroca = async (dados) => {
  const response = await connectBack.post('/trocas', dados);
  return response.data;
};

export const listarTrocas = async () => {
  const response = await connectBack.get('/trocas');
  return response.data;
};

export const cancelarTroca = async (id) => {
  const response = await connectBack.delete(`/trocas/${id}`);
  return response.data;
};
