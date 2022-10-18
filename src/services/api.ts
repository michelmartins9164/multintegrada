import axios from "axios";

const api = axios.create({
    baseURL: `https://634b7ea1d90b984a1e3aaea2.mockapi.io/`,
    headers: {
        "Content-type": "application/json"
      }
})


export default api;