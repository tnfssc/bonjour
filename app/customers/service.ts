import axios from "axios"
const api = axios.create({ baseURL: process.env.CUSTOMER_SERVICE })

export default api
