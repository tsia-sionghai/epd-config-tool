// src/utils/fileSystem.ts
import { ImageFile } from "../types/common";

export const checkSDCardEmpty = async (dirHandle: FileSystemDirectoryHandle, ignoreSystemFiles = true): Promise<boolean> => {
  try {
    console.log('Starting to check directory:', dirHandle.name);

    // 獲取目錄內容
    const entries = dirHandle.values();
    
    // 遍歷所有檔案
    for await (const entry of entries) {
      // 忽略系統檔案
      if (ignoreSystemFiles && (
        entry.name.startsWith('.') ||       // 隱藏檔案
        entry.name === '.DS_Store' ||       // macOS 系統檔案
        entry.name === 'Thumbs.db' ||       // Windows 系統檔案
        entry.name === '.Spotlight-V100' || // macOS Spotlight 索引
        entry.name === '.Trashes' ||        // macOS 垃圾桶
        entry.name === '.fseventsd'         // macOS 檔案系統事件
      )) {
        console.log('Ignoring system file:', entry.name);
        continue;
      }

      // 如果找到非系統檔案
      console.log('Found non-system file:', entry.name);
      return false;
    }

    // 如果遍歷完成沒有找到非系統檔案，表示目錄為空
    console.log('Directory is empty (excluding system files)');
    return true;

  } catch (error) {
    console.error('Error checking directory:', error);
    throw error;
  }
};

// 建立目錄
export const createDirectory = async (
  parentHandle: FileSystemDirectoryHandle,
  path: string
): Promise<FileSystemDirectoryHandle> => {
  try {
    const parts = path.split('/').filter(part => part.length > 0);
    let currentHandle = parentHandle;

    for (const part of parts) {
      currentHandle = await currentHandle.getDirectoryHandle(part, { create: true });
    }

    return currentHandle;
  } catch (error) {
    console.error('Error creating directory:', error);
    throw error;
  }
};

// 建立 signage_configure.json
export const createConfigFile = async (
  dirHandle: FileSystemDirectoryHandle,
  config: {
    Customer: string;
    Mode: string;
    PowerMode: string;
    Interval: string;
    WifiSetting: string;
    TimeZone: string;
    SoftAP: string;
    Path: string;
    ServerURL: string;
    PackageName: string;
    ActivityName: string;
  }
) => {
  try {
    const configContent = JSON.stringify(config, null, 2);
    await writeFile(dirHandle, 'signage_configure.json', configContent);
  } catch (error) {
    console.error('Error creating config file:', error);
    throw error;
  }
};

// 新增建立空檔案的函數
export const createEmptyFile = async (
  dirHandle: FileSystemDirectoryHandle,
  fileName: string
): Promise<void> => {
  try {
    console.log(`Creating empty file: ${fileName}`);
    await writeFile(dirHandle, fileName, '');
    console.log(`Successfully created empty file: ${fileName}`);
  } catch (error) {
    console.error(`Error creating empty file ${fileName}:`, error);
    throw error;
  }
};

// 寫入檔案
export const writeFile = async (
  dirHandle: FileSystemDirectoryHandle,
  fileName: string,
  content: string | Blob
): Promise<void> => {
  try {
    console.log(`Writing file: ${fileName}`);
    const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
    console.log(`File written successfully: ${fileName}`);
  } catch (error) {
    console.error(`Error writing file ${fileName}:`, error);
    throw error;
  }
};

// 複製並重新命名圖片
export const copyImages = async (
  images: ImageFile[],
  targetDir: FileSystemDirectoryHandle
) => {
  try {
    for (const [index, image] of images.entries()) {
      // 使用傳入的檔案名稱
      const newFileName = image.name;  // 改用傳入的名稱
      console.log(`Copying image ${newFileName}`);
      
      // 確保檔案存在
      if (!image.file) {
        console.error(`No file found for image at index ${index}`);
        continue;
      }

      // 使用 arrayBuffer 來複製檔案
      const blob = new Blob([await image.file.arrayBuffer()], { type: image.file.type });
      await writeFile(targetDir, newFileName, blob);
      console.log(`Successfully copied ${newFileName}`);
    }
  } catch (error) {
    console.error('Error copying images:', error);
    throw error;
  }
};

// 下載並儲存 bin 檔案
export const downloadAndSaveBinFiles = async (
  urls: string[],
  targetDir: FileSystemDirectoryHandle
): Promise<void> => {
  try {
    for (const url of urls) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to download: ${url}`);
      }

      const blob = await response.blob();
      const fileName = url.split('/').pop() || 'default.bin';
      await writeFile(targetDir, fileName, blob);
    }
  } catch (error) {
    console.error('Error downloading bin files:', error);
    throw error;
  }
};

// 新增清理函數
export const cleanupSDCard = async (
  dirHandle: FileSystemDirectoryHandle,
  failedAtStep: string
): Promise<void> => {
  try {
    console.log(`Starting cleanup after failure at step: ${failedAtStep}`);

    // 遞迴刪除目錄及其內容的輔助函數
    const removeDirectoryRecursive = async (dirHandle: FileSystemDirectoryHandle) => {
      for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file') {
          await dirHandle.removeEntry(entry.name);
          console.log(`Deleted file: ${entry.name}`);
        } else if (entry.kind === 'directory') {
          const subDir = await dirHandle.getDirectoryHandle(entry.name);
          await removeDirectoryRecursive(subDir);
          await dirHandle.removeEntry(entry.name);
          console.log(`Deleted directory: ${entry.name}`);
        }
      }
    };

    // 刪除 show_info 檔案
    try {
      await dirHandle.removeEntry('show_info');
      console.log('Deleted show_info file');
    } catch (error) {
      console.log('show_info file not found or already deleted:', error);
    }

    // 刪除圖片目錄（如果存在）
    try {
      const imageDir = await dirHandle.getDirectoryHandle('image');
      await removeDirectoryRecursive(imageDir);
      await dirHandle.removeEntry('image');
      console.log('Deleted image directory and its contents');
    } catch (error) {
      console.log('Image directory not found or already deleted:', error);
    }

    // 刪除設定檔（如果存在）
    try {
      await dirHandle.removeEntry('signage_configure.json');
      console.log('Deleted configuration file');
    } catch (error) {
      console.log('Configuration file not found or already deleted:', error);
    }

    console.log('Cleanup completed successfully');
  } catch (error) {
    console.error('Error during cleanup:', error);
    // 不拋出錯誤，因為這是清理過程
  }
};
