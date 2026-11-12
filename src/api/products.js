const API_URL = 'http://localhost:8000/api/v1';

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке товаров');
  }
  return await response.json();
};