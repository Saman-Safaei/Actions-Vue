import { defineStore } from "pinia";

export const useUserStore = defineStore("users", {
  state: () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    return {
      token: token,
      username: username
    };
  },
  actions: {
    logIn(token, username) {
      this.token = token;
      this.username = username;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
    },
    logOut() {
      this.token = null;
      this.username = null;
      localStorage.setItem("token", "");
      localStorage.setItem("username", "");
    }
  },
  getters: {
    loggingIn() {
      return (this.token && this.username)
    }
  }
});
