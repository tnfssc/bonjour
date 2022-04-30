import axios from "axios"
const api = axios.create({ baseURL: process.env.ROOM_SERVICE })

export default api
