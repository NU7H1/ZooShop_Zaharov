import { API_BASE_URL, fetchData } from '../apiConfig.js';

class ProductService {
  async getProducts() {
    return fetchData(`${API_BASE_URL}/products`);
  }

  async setVisibility(productId, hidden) {
    return fetchData(`${API_BASE_URL}/products/${productId}/visibility`, {
      method: 'PATCH',
      body: JSON.stringify({ hidden }),
    });
  }
}

export default new ProductService();
