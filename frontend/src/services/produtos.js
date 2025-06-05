import connectBack from './conectBack';

export const listarProdutos = async () => {
  const response = await connectBack.get('/produtos');
  return response.data;
};

export const criarProduto = async (dados) => {
  const response = await connectBack.post('/produtos', dados);
  return response.data;
};

export const atualizarProduto = async (id, dados) => {
  const response = await connectBack.put(`/produtos/${id}`, dados);
  return response.data;
};

export const deletarProduto = async (id) => {
  const response = await connectBack.delete(`/produtos/${id}`);
  return response.data;
};
