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
    console.log('Starting uploadImageToBin:', { 
      fileName: file.name, 
      size,
      fileType: file.type,
      fileSize: file.size 
    });
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('size', size);
    formData.append('parameter', '');

    // 加入更多請求細節以便於調試
    const response = await fetch('https://api.ezread.com.tw/Image/toE6bin', {
      method: 'POST',
      body: formData,
      headers: {
        // 不要設定 Content-Type，讓瀏覽器自動處理 multipart/form-data
        'Accept': 'application/json',
      }
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      // 嘗試讀取詳細的錯誤訊息
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    return data;
  } catch (error) {
    console.error('Error in uploadImageToBin:', error);
    throw error;
  }
};
