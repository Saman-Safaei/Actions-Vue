import axios from "axios";

const baseURL = "https://api-actions-node.herokuapp.com";

export { baseURL };
export default axios.create({ baseURL });
