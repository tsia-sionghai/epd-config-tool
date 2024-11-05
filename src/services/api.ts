// src/services/api.ts
export const uploadImageToBin = async (
  file: File,
  size: string
): Promise<{
  message: string;
  image_url?: string;
  bin_url?: string[];
}> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('size', size);
    formData.append('parameter', '');

    // 使用 HTTPS URL
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
    console.error('Error in uploadImageToBin:', error);
    throw error;
  }
};
