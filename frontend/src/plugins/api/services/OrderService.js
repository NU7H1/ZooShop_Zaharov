import { API_BASE_URL, fetchData } from '../apiConfig.js';

class OrderService {
  async getOrders(userId, role) {
    return fetchData(`${API_BASE_URL}/orders?userId=${userId}&role=${role}`);
  }

  async createOrder(orderData) {
    return fetchData(`${API_BASE_URL}/orders`, {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async updateStatus(orderId, status) {
    return fetchData(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }
}

export default new OrderService();