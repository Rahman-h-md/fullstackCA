import axios from 'axios';

const api = axios.create({
    baseURL: 'fullstack-8vo3mhm48-rahmans-projects-5d6814d1.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
