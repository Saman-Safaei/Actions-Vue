import api from "../api";

class Action {

  static endpoint = "/actions";

  constructor(form_data) {
    this.token = localStorage.getItem("token");
    this.form_data = form_data;
  }

  async save() {
    const { data } = await api.post(Action.endpoint, this.form_data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "token": this.token
      }
    });
    return data.created;
  }

  static async getAll() {
    const token = localStorage.getItem("token"); // Get Token From LocalStorage
    const { data: actions } = await api.get(this.endpoint, {
      headers: {
        token
      }
    });
    return actions;
  }

  static async delete(id) {
    const token = localStorage.getItem("token");
    const { data: response } = await api.delete(this.endpoint, {
      data: {
        id
      },
      headers: {
        token
      },
    });
    return response.deleted;
  }
}

export default Action;
