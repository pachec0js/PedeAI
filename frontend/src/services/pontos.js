import connectBack from './conectBack';

export const consultarPontos = async (ra) => {
  const response = await connectBack.get(`/pontos/${ra}`);
  return response.data;
};

export const atualizarPontos = async (ra, dados) => {
  const response = await connectBack.put(`/pontos/${ra}`, dados);
  return response.data;
};
