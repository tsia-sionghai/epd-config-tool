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
    console.log('Starting uploadImageToBin:', { fileName: file.name, size });
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('size', size);
    formData.append('parameter', '');

    // 修改 URL 路徑為正確的大小寫
    const response = await fetch('https://api.ezread.com.tw/Image/toE6bin', {
      method: 'POST',
      body: formData,
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
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
