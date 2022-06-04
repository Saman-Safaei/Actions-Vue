import axios from "axios";

const baseURL = "http://localhost:3030";

export { baseURL };
export default axios.create({ baseURL });
