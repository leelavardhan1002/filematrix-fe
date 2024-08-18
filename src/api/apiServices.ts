import axios from 'axios';

// Define a type for the HTTP client configuration
interface HttpClientConfig {
  headers?: Record<string, string>;
  [key: string]: any; // Allow other properties if needed
}

// Define a type for the HTTP client
type HttpClient = {
  get: (url: string, config?: HttpClientConfig) => Promise<any>;
  post: (url: string, data?: any, config?: HttpClientConfig) => Promise<any>;
  put: (url: string, data?: any, config?: HttpClientConfig) => Promise<any>;
  delete: (url: string, config?: HttpClientConfig) => Promise<any>;
};

// Axios client
const axiosClient: HttpClient = {
  get: async (url: string, config?: HttpClientConfig) => {
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`HTTP error! status: ${error.response?.status}`);
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  },
  post: async (url: string, data?: any, config?: HttpClientConfig) => {
    try {
      const response = await axios.post(url, data, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`HTTP error! status: ${error.response?.status}`);
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  },
  put: async (url: string, data?: any, config?: HttpClientConfig) => {
    try {
      const response = await axios.put(url, data, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`HTTP error! status: ${error.response?.status}`);
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  },
  delete: async (url: string, config?: HttpClientConfig) => {
    try {
      const response = await axios.delete(url, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`HTTP error! status: ${error.response?.status}`);
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  },
};

// Fetch client
const fetchClient: HttpClient = {
  get: async (url: string, config?: HttpClientConfig) => {
    const response = await fetch(url, { ...config, method: 'GET' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  post: async (url: string, data?: any, config?: HttpClientConfig) => {
    const response = await fetch(url, { 
      ...config, 
      method: 'POST', 
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', ...config?.headers } 
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  put: async (url: string, data?: any, config?: HttpClientConfig) => {
    const response = await fetch(url, { 
      ...config, 
      method: 'PUT', 
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', ...config?.headers } 
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  delete: async (url: string, config?: HttpClientConfig) => {
    const response = await fetch(url, { ...config, method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
};

// API functions
export const apiGet = (endpoint: string, config?: HttpClientConfig) =>
    axiosClient.get(endpoint, config);
  
export const apiPost = (endpoint: string, data?: any, config?: HttpClientConfig) =>
    axiosClient.post(endpoint, data, config);
  
export const apiPut = (endpoint: string, data?: any, config?: HttpClientConfig) =>
    axiosClient.put(endpoint, data, config);
  
export const apiDelete = (endpoint: string, config?: HttpClientConfig) =>
    axiosClient.delete(endpoint, config);
