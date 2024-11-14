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

// 定義進度參數的介面
interface ProgressParams {
 current?: number;
 total?: number;
 name?: string;
}

export const createEPosterPackage = async (
 config: SignageConfigFile,
 images: ImageConfig['images'],
 onProgress?: (message: string, params?: ProgressParams) => void
): Promise<Blob> => {
 const updateProgress = (message: string, params?: ProgressParams) => {
   onProgress?.('common.nasStatus.' + message, params);
   console.log('Progress:', message, params);
 };

 const zip = new JSZip();
 
 try {
   // 1. 準備
   updateProgress('preparing');

   // 2. 加入設定檔
   updateProgress('creatingConfig');
   zip.file('signage_configure.json', JSON.stringify(config, null, 2));

   // 3. 加入空的 show_info
   updateProgress('creatingFiles');
   zip.file('show_info', '');

   // 4. 創建圖片目錄
   updateProgress('creatingDirectory');
   const imageFolder = zip.folder('image/slideshow');
   if (!imageFolder) throw new Error('建立目錄失敗');

   // 5. 處理每張圖片和對應的 bin 檔案
   const totalImages = images.length;
   for (let i = 0; i < totalImages; i++) {
     const image = images[i];
     const extension = image.name.split('.').pop() || '';
     const imageNumber = i + 1;
     const newFileName = `${imageNumber}.${extension}`;

     // 複製圖片
     updateProgress('copyingImages');
     const imageBlob = await image.file.arrayBuffer();
     imageFolder.file(newFileName, imageBlob);

     // 處理圖片
     updateProgress('processingImages');

     // 上傳圖片取得 bin 檔案
     updateProgress('uploadingImage', {
       current: imageNumber,
       total: totalImages,
       name: newFileName
     });

     const binResult = await uploadImageToBin(image.file, config.Size);

     if (binResult.bin_url && binResult.bin_url.length > 0) {
       const totalBins = binResult.bin_url.length;
       for (let binIndex = 0; binIndex < totalBins; binIndex++) {
         // 下載 bin 檔案
         updateProgress('downloadingBinFiles', {
          current: binIndex + 1,  // 當前 bin 檔案序號（從1開始）
          total: totalBins       // 該圖片的 bin 檔案總數
        });

         const url = binResult.bin_url[binIndex];
         const secureUrl = url.replace('http://', 'https://');
         const response = await fetch(secureUrl);
         
         if (!response.ok) {
           throw new Error('下載播放檔案失敗');
         }
         
         const binContent = await response.blob();
         const binFileName = `${imageNumber}_${binIndex}.bin`;
         imageFolder.file(binFileName, binContent);
       }
     }
   }

   // 6. 生成主要的 ZIP
   updateProgress('creatingZip');
   const mainZipBlob = await zip.generateAsync({ type: 'blob' });

   // 7. 計算雜湊值
   updateProgress('calculatingHash');
   const hash = generateSimpleHash();

   // 8. 創建最終的 ZIP（包含雜湊檔案）
   const finalZip = new JSZip();
   await finalZip.loadAsync(mainZipBlob);
   finalZip.file('ePoster.zip.md5', hash);

   return await finalZip.generateAsync({ type: 'blob' });

 } catch (error) {
   console.error('建立 ePoster 壓縮檔時發生錯誤:', error);
   throw error instanceof Error ? error : new Error('下載播放檔案失敗');
 }
};
