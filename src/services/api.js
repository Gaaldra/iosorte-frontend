import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Content-Type': 'application/json'
    },
})

export default api;