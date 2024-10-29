import axios from 'axios';
const API_BASE_URL = 'https://api.ezread.com.tw';
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/image/toE6bin', formData);
    return response.data;
};
export const generateConfig = async (config) => {
    const response = await api.post('/generate-config', config);
    return response.data;
};
// 添加其他 API 調用函數...
export default api;
