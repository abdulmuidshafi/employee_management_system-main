import axios from "axios";
let uri = import.meta.env.VITE_REACT_APP_API_BASE_URL;
const AxiosInstance = axios.create({
  baseURL: uri,
});

export default AxiosInstance;
