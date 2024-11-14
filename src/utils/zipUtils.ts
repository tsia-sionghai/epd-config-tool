// src/utils/zipUtils.ts
import JSZip from "jszip";
import { SignageConfigFile, ImageConfig } from "../types/common";
import { uploadImageToBin } from "../services/api";

// 狀態常數
const UPDATE_STATUS = {
  PREPARING: "preparing",
  CREATING_CONFIG: "creatingConfig",
  CREATING_DIRECTORY: "creatingDirectory",
  COPYING_IMAGE: "copyingImage",
  PROCESSING_IMAGE: "processingImage",
  DOWNLOADING_BIN: "downloadingBin",
  CREATING_ZIP: "creatingZip",
  CALCULATING_HASH: "calculatingHash",
} as const;

// 簡單的雜湊生成函數
const generateSimpleHash = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  return `${timestamp.toString(16)}${random}`;
};

// 進度參數介面
interface ProgressParams {
  imageNumber?: number;
  totalImages?: number;
  binNumber?: number;
  totalBins?: number;
  name?: string;
  currentStep?: number;
  totalSteps?: number;
  percent?: number;
}

export const createEPosterPackage = async (
  config: SignageConfigFile,
  images: ImageConfig["images"],
  onProgress?: (message: string, params?: ProgressParams) => void
): Promise<Blob> => {
  // 計算總步驟數
  let totalSteps = 0;
  let currentStep = 0;

  // 基本步驟：準備、建立設定檔、建立目錄
  totalSteps = 3;

  // 每張圖片的步驟：複製和上傳
  totalSteps += images.length * 2;

  try {
    // 計算 bin 檔案的數量
    const binResults = await Promise.all(
      images.map((image) => uploadImageToBin(image.file, config.Size))
    );

    const totalBinFiles = binResults.reduce(
      (sum, result) => sum + (result.bin_url?.length || 0),
      0
    );

    // 加入 bin 檔案下載步驟
    totalSteps += totalBinFiles;

    // 最後步驟：壓縮和雜湊
    totalSteps += 2;
  } catch (error) {
    console.error("計算總步驟時發生錯誤:", error);
    throw new Error("準備過程發生錯誤");
  }

  const updateProgress = (
    message: string,
    params?: Omit<ProgressParams, "currentStep" | "totalSteps" | "percent">
  ) => {
    currentStep++;
    const percent = Math.round((currentStep / totalSteps) * 100);

    onProgress?.("common.status." + message, {
      ...params,
      currentStep,
      totalSteps,
      percent,
    });
  };

  const zip = new JSZip();

  try {
    // 1. 準備
    updateProgress(UPDATE_STATUS.PREPARING);

    // 2. 加入設定檔
    updateProgress(UPDATE_STATUS.CREATING_CONFIG);
    zip.file("signage_configure.json", JSON.stringify(config, null, 2));

    // 3. 加入空的 show_info 和創建目錄
    updateProgress(UPDATE_STATUS.CREATING_DIRECTORY);
    zip.file("show_info", "");
    const imageFolder = zip.folder("image/slideshow");
    if (!imageFolder) {
      throw new Error("建立目錄失敗");
    }

    // 4. 處理每張圖片和對應的 bin 檔案
    const totalImages = images.length;

    for (let i = 0; i < totalImages; i++) {
      const image = images[i];
      const extension = image.name.split(".").pop() || "";
      const imageNumber = i + 1;
      const newFileName = `${imageNumber}.${extension}`;

      // 複製圖片
      updateProgress(UPDATE_STATUS.COPYING_IMAGE, {
        imageNumber,
        totalImages,
        name: newFileName,
      });

      const imageBlob = await image.file.arrayBuffer();
      imageFolder.file(newFileName, imageBlob);

      // 上傳並取得 bin 檔案
      updateProgress(UPDATE_STATUS.PROCESSING_IMAGE, {
        imageNumber,
        totalImages,
      });

      const binResult = await uploadImageToBin(image.file, config.Size);

      if (binResult.bin_url && binResult.bin_url.length > 0) {
        const totalBins = binResult.bin_url.length;

        for (let binIndex = 0; binIndex < totalBins; binIndex++) {
          updateProgress(UPDATE_STATUS.DOWNLOADING_BIN, {
            imageNumber,
            totalImages,
            binNumber: binIndex + 1,
            totalBins,
          });

          const url = binResult.bin_url[binIndex];
          const secureUrl = url.replace("http://", "https://");
          const response = await fetch(secureUrl);

          if (!response.ok) {
            throw new Error("下載播放檔案失敗");
          }

          const binContent = await response.blob();
          const binFileName = `${imageNumber}_${binIndex}.bin`;
          imageFolder.file(binFileName, binContent);
        }
      }
    }

    // 5. 生成主要的 ZIP
    updateProgress(UPDATE_STATUS.CREATING_ZIP);
    const mainZipBlob = await zip.generateAsync({ type: "blob" });

    // 6. 計算雜湊值
    updateProgress(UPDATE_STATUS.CALCULATING_HASH);
    const hash = generateSimpleHash();

    // 7. 創建最終的 ZIP（包含雜湊檔案）
    const finalZip = new JSZip();
    await finalZip.loadAsync(mainZipBlob);
    finalZip.file("ePoster.zip.md5", hash);

    return await finalZip.generateAsync({ type: "blob" });
  } catch (error) {
    console.error("建立 ePoster 套件時發生錯誤:", error);
    throw error instanceof Error ? error : new Error("建立 ePoster 套件失敗");
  }
};
