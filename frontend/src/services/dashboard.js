import connectBack from './conectBack';

export const obterDashboard = async () => {
  const response = await connectBack.get('/dashboard');
  return response.data;
};
