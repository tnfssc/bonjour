import axios from "axios"
const api = axios.create({ baseURL: process.env.RESERVATION_SERVICE })

export default api
