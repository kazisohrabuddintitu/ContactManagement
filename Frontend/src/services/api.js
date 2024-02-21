import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Added an interceptor to include the token in every request
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
  
    if (token) {
      // Remove the "Bearer" prefix if present
      config.headers.Authorization = token.startsWith('Bearer ') ? token.slice(7) : token;
    }
  
    return config;
  }, error => {
    return Promise.reject(error);
  });

export default api;
