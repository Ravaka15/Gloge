import axios from "axios";

const API_URL = "http://localhost:8080/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();