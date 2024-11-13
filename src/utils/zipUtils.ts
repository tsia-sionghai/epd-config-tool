// src/utils/zipUtils.ts
import JSZip from 'jszip';
import { SignageConfigFile, ImageConfig } from '../types/common';
import { uploadImageToBin } from '../services/api';

// 簡單的雜湊生成函數
const generateSimpleHash = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  return `${timestamp.toString(16)}${random}`;
};

export const createEPosterPackage = async (
  config: SignageConfigFile,
  images: ImageConfig['images'],
  onProgress?: (message: string) => void
): Promise<Blob> => {
  const updateProgress = (message: string) => {
    onProgress?.(message);
    console.log(message);
  };

  const zip = new JSZip();
  
  try {
    // 1. 加入設定檔
    updateProgress('Creating configuration file...');
    zip.file('signage_configure.json', JSON.stringify(config, null, 2));

    // 2. 加入空的 show_info
    zip.file('show_info', '');

    // 3. 創建圖片目錄
    const imageFolder = zip.folder('image/slideshow');
    if (!imageFolder) throw new Error('Failed to create image folder');

    // 4. 處理每張圖片和對應的 bin 檔案
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const extension = image.name.split('.').pop() || '';
      const imageNumber = i + 1;
      const newFileName = `${imageNumber}.${extension}`;

      // 複製圖片
      updateProgress(`Processing image ${imageNumber}/${images.length}...`);
      const imageBlob = await image.file.arrayBuffer();
      imageFolder.file(newFileName, imageBlob);

      // 處理 bin 檔案
      updateProgress(`Converting image ${imageNumber}/${images.length}...`);
      const binResult = await uploadImageToBin(image.file, config.Size);

      if (binResult.bin_url && binResult.bin_url.length > 0) {
        updateProgress(`Downloading bin files for image ${imageNumber}/${images.length}...`);
        
        for (let binIndex = 0; binIndex < binResult.bin_url.length; binIndex++) {
          const url = binResult.bin_url[binIndex];
          const secureUrl = url.replace('http://', 'https://');
          const response = await fetch(secureUrl);
          
          if (!response.ok) {
            throw new Error(`Failed to download bin file: ${secureUrl}`);
          }
          
          const binContent = await response.blob();
          const binFileName = `${imageNumber}_${binIndex}.bin`;
          imageFolder.file(binFileName, binContent);
        }
      }
    }

    // 5. 生成 ZIP
    updateProgress('Creating ZIP file...');
    const mainZipBlob = await zip.generateAsync({ type: 'blob' });

    // 6. 生成簡單的雜湊值
    const hash = generateSimpleHash();

    // 7. 創建最終的 ZIP（包含雜湊檔案）
    const finalZip = new JSZip();
    await finalZip.loadAsync(mainZipBlob);
    finalZip.file('ePoster.zip.md5', hash);

    return await finalZip.generateAsync({ type: 'blob' });

  } catch (error) {
    console.error('Error creating ePoster package:', error);
    throw error instanceof Error ? error : new Error('Failed to create ePoster package');
  }
};
