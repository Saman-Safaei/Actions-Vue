import api from "../api";

class User {
  static base_endpoint = "/";

  constructor(username, pasword, email) {
    this.username = username;
    this.pasword = pasword;
    this.email = email;
  }

  signup() {
    return api.post(User.base_endpoint+"register/", {
      username: this.username,
      email: this.email,
      password: this.pasword
    });
  }

  static login(username, password) {
    return api.post(this.base_endpoint + "login/", {
      username,
      password
    });
  }
  
}

export default User;
