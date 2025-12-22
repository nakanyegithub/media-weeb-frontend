// Этот файл будет использоваться для подключения к бэкенду
// Пока используем моковые данные

const API_BASE_URL = 'http://localhost:3000/api';

// Моковые функции для демонстрации
export const mediaApi = {
  getAll: async () => {
    // В реальном приложении здесь будет:
    // return axios.get(`${API_BASE_URL}/media`);
    return { data: [] };
  },
  
  getById: async (id) => {
    // return axios.get(`${API_BASE_URL}/media/${id}`);
    return { data: null };
  },
  
  create: async (data) => {
    // return axios.post(`${API_BASE_URL}/media`, data);
    return { data: { id: Date.now() } };
  },
  
  update: async (id, data) => {
    // return axios.patch(`${API_BASE_URL}/media/${id}`, data);
    return { data: { success: true } };
  },
  
  delete: async (id) => {
    // return axios.delete(`${API_BASE_URL}/media/${id}`);
    return { data: { success: true } };
  }
};