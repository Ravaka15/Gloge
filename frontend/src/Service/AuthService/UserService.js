import axios from 'axios';
import authService from './AuthService';

const API_URL = 'http://localhost:8080/';


class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'users');
      }
    
      getUserBoard() {
        // eslint-disable-next-line no-undef
        return axios.get(API_URL + 'user', { headers: authHeader() });
      }
    
      getModeratorBoard() {
        // eslint-disable-next-line no-undef
        return axios.get(API_URL + 'mod', { headers: authHeader() });
      }
    
      getAdminBoard() {
        // eslint-disable-next-line no-undef
        return axios.get(API_URL + 'admin', { headers: authHeader() });
      }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
