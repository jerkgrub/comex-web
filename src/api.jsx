// src/api.js
import axios from 'axios';

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: 'https://comex-server.vercel.app/api', // Replace with your API base URL
});

// Add a request interceptor to include the token in every request
api.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Add the token to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle any errors
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Token might be invalid or expired
      // Remove token from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');

      // Optionally, redirect to login page
      window.location.href = '/login'; // Adjust the path as needed
    }
    return Promise.reject(error);
  }
);

export default api;
