import { API_BASE_URL, fetchData } from '../apiConfig.js';

class LoginService {
  async authorizationUser(login, password) {
    return fetchData(
      `${API_BASE_URL}/login/auth?login=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}`
    );
  }
}

export default new LoginService();