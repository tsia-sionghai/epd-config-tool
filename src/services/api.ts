// src/services/api.ts
import type { UploadResponse } from './api.d';
import { handleApiError } from '../utils/errorHandler';

export const uploadImageToBin = async (
  file: File,
  size: string
): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('size', size);
    formData.append('parameter', '');

    const response = await fetch('https://api.ezread.com.tw/Image/toE6bin', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      console.error('API Response error:', {
        status: response.status,
        statusText: response.statusText
      });
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    return data;

  } catch (error) {
    handleApiError(error);  // 加入錯誤處理
    throw error;
  }
};
