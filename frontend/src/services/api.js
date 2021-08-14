//conecta o front com o backend atraves da rota
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;