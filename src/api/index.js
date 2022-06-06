import axios from "axios";

const baseURL = import.meta.env.VITE_API;

export { baseURL };
export default axios.create({ baseURL });
