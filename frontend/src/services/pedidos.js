import connectBack from './conectBack';

export const criarPedido = async (dados) => {
  const response = await connectBack.post('/pedidos', dados);
  return response.data;
};

export const listarPedidos = async () => {
  const response = await connectBack.get('/pedidos');
  return response.data;
};

export const atualizarStatusPedido = async (id, dados) => {
  const response = await connectBack.put(`/pedidos/${id}`, dados);
  return response.data;
};
