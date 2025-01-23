import { AxiosError } from 'axios';

export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    console.error('API Error:', error.response?.data);
    // 可以在這裡添加錯誤通知邏輯
  } else {
    console.error('Unexpected error:', error);
  }
};
