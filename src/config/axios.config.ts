import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:1337/api',
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" }
})

export default api