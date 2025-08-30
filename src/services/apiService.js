import axios from "axios";

const createApi = () => {
  const instance = axios.create({
    baseURL: "http://localhost:8000/api",
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

const api = createApi();

export async function getRequest(url, config = {}) {
  try {
    const response = await api.get(url, config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || error.message || error;
  }
}

export async function postRequest(url, data, config = {}) {
  try {
    const response = await api.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || error.message || error;
  }
}

export async function putRequest(url, data, config = {}) {
  try {
    const response = await api.put(url, data, config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || error.message || error;
  }
}

export async function deleteRequest(url, config = {}) {
  try {
    const response = await api.delete(url, config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || error.message || error;
  }
}
