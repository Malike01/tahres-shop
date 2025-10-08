import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },

  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          console.error("Authorization Error (401): Invalid credentials or session expired.");
          window.location.href = '/login';
          break;

        case 403:
          console.error("Access Forbidden (403): You do not have permission to perform this action.");
          break;

        case 404:
          console.error("Resource not found (404).");
          break;

        case 500:
          console.error("Server Error (500): Please try again later.");
          break;
        
        default:
          console.error(`An unexpected error occurred: ${status}`);
          break;
      }
    } else if (error.request) {
      console.error("No response received from server. Check your internet connection.");
    } else {
      console.error('Request failed:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
